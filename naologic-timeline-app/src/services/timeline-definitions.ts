interface WorkOrderDocument {
  docId: string;
  docType: 'workOrder';
  data: {
    name: string;
    workCenterId: string;           // References WorkCenterDocument.docId
    status: WorkOrderStatus;
    startDate: string|number;              // ISO format (e.g., "2025-01-15")
    endDate: string|number;                // ISO format
  };
}
type WorkOrderStatus = 'open' | 'in-progress' | 'complete' | 'blocked';