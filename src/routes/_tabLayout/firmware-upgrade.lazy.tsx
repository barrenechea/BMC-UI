import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useEffect, useRef, useState } from "react";

import ConfirmationModal from "@/components/ConfirmationModal";
import RebootModal from "@/components/RebootModal";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useFirmwareUpdateMutation } from "@/lib/api/file";
import { useFirmwareStatusQuery } from "@/lib/api/get";
import { useRebootBMCMutation } from "@/lib/api/set";

export const Route = createLazyFileRoute("/_tabLayout/firmware-upgrade")({
  component: FirmwareUpgrade,
});

function FirmwareUpgrade() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmFlashModal, setConfirmFlashModal] = useState(false);
  const [rebootModalOpened, setRebootModalOpened] = useState(false);
  const [progress, setProgress] = useState<{
    transferred: string;
    total?: string;
    pct: number;
  }>({ transferred: "", total: "", pct: 0 });
  const uploadProgressCallback = (progressEvent: AxiosProgressEvent) => {
    setProgress({
      transferred: filesize(progressEvent.loaded ?? 0, { standard: "jedec" }),
      total: filesize(progressEvent.total ?? 0, { standard: "jedec" }),
      pct: Math.round(
        ((progressEvent.loaded ?? 0) / (progressEvent.total ?? 1)) * 100
      ),
    });
  };
  const {
    mutate: mutateFirmwareUpdate,
    isIdle,
    isPending,
  } = useFirmwareUpdateMutation(uploadProgressCallback);
  const { mutate: mutateRebootBMC } = useRebootBMCMutation();
  const { data, refetch } = useFirmwareStatusQuery(isUpgrading);

  useEffect(() => {
    if (isUpgrading && data?.Error) {
      setStatusMessage(data.Error);
      toast({
        title: "An error has occurred",
        description: data.Error,
        variant: "destructive",
      });
      setIsUpgrading(false);
    } else if (!isUpgrading && data?.Transferring) {
      setIsUpgrading(true);
      setStatusMessage("Writing firmware to BMC...");

      // Update progress bar using bytes_written from Transferring data
      const bytesWritten = data.Transferring.bytes_written ?? 0;
      setProgress({
        transferred: `${filesize(bytesWritten, { standard: "jedec" })} written`,
        total: undefined,
        pct: 100,
      });
    } else if (isUpgrading && data?.Done) {
      setIsUpgrading(false);
      const msg = "Firmware upgrade completed successfully";
      setStatusMessage(msg);
      toast({ title: "Upgrade successful", description: msg });
      setRebootModalOpened(true);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmFlashModal(true);
  };

  const handleFirmwareUpload = () => {
    if (formRef.current) {
      setConfirmFlashModal(false);

      const form = formRef.current;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const url = (form.elements.namedItem("file-url") as HTMLInputElement)
        .value;
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;

      setStatusMessage("Uploading BMC firmware...");
      mutateFirmwareUpdate(
        { file, url, sha256 },
        {
          onSuccess: () => {
            void refetch();
          },
          onError: (e) => {
            const msg = "Upgrade failed";
            setStatusMessage(msg);
            toast({
              title: msg,
              description: e.message,
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  const handleRebootBMC = () => {
    setRebootModalOpened(false);
    mutateRebootBMC(undefined, {
      onSuccess: () => {
        toast({ title: "Rebooting BMC", description: "The BMC is rebooting" });
      },
      onError: (e) => {
        toast({
          title: "Failed to reboot BMC",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <TabView title="Upgrade BMC firmware">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="file"
            name="file"
            label=".tpu file (remote or local):"
            accept=".tpu,.tpu.xz,application/octet-stream"
          />
        </div>
        <div className="mb-4">
          <Input type="text" name="sha256" label="SHA-256 (optional):" />
        </div>
        <div>
          <Button
            type="submit"
            disabled={isPending || isUpgrading}
            isLoading={isPending || isUpgrading}
          >
            Upgrade
          </Button>
        </div>
        {!isIdle && (
          <div className="mt-4 block">
            <Progress
              aria-label="Firmware upgrade progress"
              value={progress.pct}
              label={`${progress.transferred}${progress.total ? ` / ${progress.total}` : ""}`}
              pulsing={isPending || isUpgrading}
            />
            <div className="mt-2 text-sm">{statusMessage}</div>
          </div>
        )}
      </form>
      <ConfirmationModal
        isOpen={confirmFlashModal}
        onClose={() => setConfirmFlashModal(false)}
        onConfirm={handleFirmwareUpload}
        title="Upgrade Firmware?"
        message="A reboot is required to finalise the upgrade process."
      />
      <RebootModal
        isOpen={rebootModalOpened}
        onClose={() => setRebootModalOpened(false)}
        onReboot={handleRebootBMC}
        title="Upgrade Finished!"
        message={
          <div className="text-neutral-900 opacity-60 dark:text-neutral-100">
            <p>To finalize the upgrade, a system reboot is necessary.</p>
            <p>Would you like to proceed with the reboot now?</p>
            <p className="mt-4 text-xs italic">
              The nodes will temporarily lose power until the reboot process is
              complete.
            </p>
          </div>
        }
        isPending={isPending}
      />
    </TabView>
  );
}
