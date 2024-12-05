export interface TTNUplink {
  end_device_ids: {
    device_id: string;
    application_ids: {
      application_id: string;
    };
    dev_eui: string;
  };
  uplink_message: {
    decoded_payload: {
      voltage: number;
      distance: number;
    };
    received_at: string;
  };
}