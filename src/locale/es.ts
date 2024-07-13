import { type OptionalTranslations } from "@/locale/en";

const translations = {
  navigation: {
    info: "Información",
    nodes: "Nodos",
    usb: "USB",
    firmwareUpgrade: "Actualizar Firmware",
    flashNode: "Instalar SO",
    about: "Acerca de",
  },
  userNav: {
    language: "Lenguaje",
    theme: "Tema",
    themeSystem: "Sistema",
    themeLight: "Claro",
    themeDark: "Oscuro",
    logout: "Cerrar Sesión",
  },
  login: {
    header: "Iniciar Sesión",
    username: "Nombre de usuario",
    password: "Contraseña",
    remember: "Recuérdame",
    submit: "Iniciar Sesión",
    errorCredentials: "Nombre de usuario o contraseña inválidos",
    errorUnknown: "Ha ocurrido un error. Intenta nuevamente más tarde.",
  },
  info: {
    userStorage: "Almacenamiento de Usuario",
    ariaStorageUtilization: "Utilización de almacenamiento",
    backupButton: "Respaldar Datos de Usuario",
    fanControl: "Control de Ventilador",
    networkInterfaces: "Interfaces de Red",
    resetNetworkButton: "Restablecer Red",
    bmc: "BMC",
    rebootButton: "Reiniciar",
    reloadDaemonButton: "Recargar Daemon",
    rebootModalTitle: "¿Desea reiniciar?",
    rebootModalDescription:
      "Tenga en cuenta que los nodos perderán energía hasta que se reinicien.",
    backupSuccess: "Archivo de respaldo descargado con éxito.",
    backupFailed: "Error al respaldar datos de usuario.",
    resetNetworkSuccess: "Restablecimiento de red exitoso.",
    resetNetworkFailed: "Restablecimiento de red fallido.",
    rebootSuccess: "El BMC se está reiniciando...",
    rebootFailed: "Error al reiniciar BMC",
    reloadDaemonSuccess: "El daemon BMC se está recargando...",
    reloadDaemonFailed: "Error al recargar el daemon BMC",
  },
  nodes: {
    header: "Controlar la fuente de alimentación de los nodos conectados",
    restartButton: "Reiniciar",
    editButton: "Editar",
    saveButton: "Guardar",
    ariaNodePowerToggle: "Alternar energía del nodo {{nodeId}}",
    node: "Nodo {{nodeId}}",
    module: "Módulo {{moduleId}}",
    nodeName: "Nombre del nodo",
    moduleName: "Nombre del módulo",
    powerManagement: "Gestión de energía",
    nodeOn: "El nodo {{nodeId}} se encendió.",
    nodeOff: "El nodo {{nodeId}} se apagó.",
    nodeRestarted: "El nodo {{nodeId}} se reinició.",
    pmError: "Error al cambiar el estado del nodo.",
    persistSuccess: "Información de nodos guardada.",
  },
  usb: {
    header: "Ruta USB",
    modeSelect: "Modo USB",
    nodeSelect: "Nodo conectado",
    submitButton: "Cambiar",
    changeSuccessTitle: "Modo USB cambiado",
    changeSuccessMessage: "Modo USB cambiado con éxito.",
    changeFailedTitle: "Error al cambiar el modo USB",
    mode: {
      definitionsTitle: "Definiciones de modo USB",
      usageWord: "Uso",
      host: "Host",
      hostDefinition: "Enciende la alimentación del puerto USB_OTG.",
      hostUsage:
        "Usa cuando quieras conectar dispositivos USB (como teclado, mouse, unidad USB, etc.) a través del puerto USB_OTG a los módulos compatibles.",
      device: "Dispositivo",
      deviceDefinition:
        "El modo predeterminado. Apaga la alimentación de USB_OTG.",
      deviceUsage: "Usa en cualquier otro caso.",
      flash: "Flash",
      flashDefinition:
        "Convierte el módulo en modo de flasheo y establece el USB_OTG en modo dispositivo.",
      flashUsage: "Usa para flashear el módulo usando el puerto USB_OTG.",
    },
  },
  firmwareUpgrade: {
    header: "Actualizar firmware BMC",
    fileInput: "Archivo .tpu (remoto o local):",
    shaInput: "SHA-256 (opcional):",
    submitButton: "Actualizar",
    ariaProgress: "Progreso de actualización de firmware",
    flashModalTitle: "¿Actualizar firmware?",
    flashModalDescription:
      "Se requiere un reinicio para finalizar el proceso de actualización.",
    uploading: "Subiendo firmware BMC...",
    writing: "Escribiendo firmware en BMC...",
    success: "Actualización de firmware exitosa",
    successMessage: "Actualización de firmware completada con éxito.",
    uploadFailed: "Error al subir el firmware BMC",
    writtenData: "{{written}} escritos",
    error: "Ha ocurrido un error",
    finishModalTitle: "¡Actualización finalizada!",
    finishModalDescription:
      "<0>Para finalizar la actualización, es necesario reiniciar el sistema.</0><1>¿Desea proceder con el reinicio ahora?</1><2>Los nodos perderán energía temporalmente hasta que se complete el proceso de reinicio.</2>",
  },
  flashNode: {
    header_one: "Instalar una imagen de SO en un nodo seleccionado",
    header_other: "Instalar una imagen de SO en nodos seleccionados",
    nodeSelect_one: "Nodo seleccionado:",
    nodeSelect_other: "Nodos seleccionados:",
    fileInput: "Archivo (remoto o local):",
    shaInput: "SHA-256 (opcional):",
    skipCrc: "Omitir CRC",
    submitButton: "Instalar SO",
    ariaProgress: "Progreso de instalación",
    flashModalTitle: "Instalar imagen de SO",
    flashModalDescription:
      "Estás a punto de sobrescribir una nueva imagen en el nodo seleccionado.",
    uploading_one: "Subiendo imagen al nodo...",
    uploading_other: "Subiendo imagen a los nodos...",
    flashing_one: "Flasheando imagen al nodo...",
    flashing_other: "Flasheando imagen a los nodos...",
    flashingCrc_one: "Verificando CRC y flasheando imagen al nodo...",
    flashingCrc_other: "Verificando CRC y flasheando imagen a los nodos...",
    transferFailed_one: "Error al transferir la imagen al nodo",
    transferFailed_other: "Error al transferir la imagen a los nodos",
    success: "Flasheo exitoso",
    successMessage: "Imagen flasheada con éxito al nodo",
  },
  about: {
    boardModel: "Modelo de placa",
    hostname: "Nombre de host",
    daemonVersion: "Versión del daemon",
    buildTime: "Fecha de compilación",
    buildVersion: "Versión de compilación",
    buildrootRelease: "Versión de Buildroot",
    apiVersion: "Versión de API",
    bmcUI: "BMC UI",
  },
  ui: {
    cancel: "Cancelar",
    continue: "Continuar",
    reboot: "Reiniciar",
    selectPlaceholder: "Seleccionar...",
    navigation: "Navegación",
    pageNotFound: "Página no encontrada",
    backToHome: "Volver a la página de inicio",
    ariaPasswordVisibility: "Alternar visibilidad de contraseña",
    ariaUploadFile: "Subir archivo",
    ariaSliderThumb: "Control deslizante",
  },
} satisfies OptionalTranslations;

export default translations;