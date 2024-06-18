import DeviceDetector from 'node-device-detector';

export const device_info = (headers) => {
  const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  });
  const device_info = detector.detect(headers);

  return JSON.stringify({
    device_code: device_info.device.code,
    device_model: device_info.device.model,
    device_type: device_info.device.type,
    client_type: device_info.client.type,
    client_name: device_info.client.name,
  });
};