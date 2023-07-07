import { useState } from 'react';
import { Upload, Button, Card, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { RcFile } from 'antd/lib/upload/interface';
import { OrdersService } from '@project-management-system/shared-services';
import { SaveOrderDto } from '@project-management-system/shared-models';


interface CustomUploadFile extends RcFile {
  uid: string;
}
export default function ExcelImport() {
  const [formData, setFormData] = useState<any[]>([])
  const [loading, setLoading] = useState(false);
  const ordersService = new OrdersService()

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { defval: null, raw: false, dateNF: 'yyyy-mm-dd' });
      setFormData(sheetData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    if (formData) {
      setLoading(true);
      const reqObj: SaveOrderDto[] = []
      for (const data of formData) {
        reqObj.push(new SaveOrderDto(data.Production_Plan_ID, data.Year, data.Planning_Season, data.Season, data.Item_Brand, data.Business_Unit, data.Item_Code, data.Item_Name, data.Main_Sample_Code, data.Main_Sample_Name, data.Supplier_Raw_Material_Code, data.Supplier_Raw_Material_Name, data.Vendor_Code, data.Vendor_Name, data.Management_Factory_Code, data.Management_Factory_Name,
          data.Branch_Factory_Code, data.Branch_Factory_Name, data.Raw_Material_Supplier_Code, data.Raw_Material_Supplier_Name, data.Sewing_Difficulty, data.Department_Code, data.Department_Name, data.Class1_Code, data.Class1_Name, data.Production_Plan_Type_Name, data.Month_Week_Flag, data.Last_Update_Date, data.Requested_Wh_Date, data.Contracted_Date, data.Transport_Method_Name,
          data.Logistics_Type_Name, data.Order_Qty_Pcs, data.Yarn_Order_Acceptance, data.Yarn_Order_Request_Date, data.Yarn_Order_Answer_Date, data.Yarn_Order_Actual_Date, data.Yarn_Order_NO,
          data.Yarn_Actual_Order_Qty_Pcs, data.Yarn_Update_Date, data.Fabric_Order_Acceptance, data.Fabric_Order_Request_Date, data.Fabric_Order_Answer_Date, data.Fabric_Order_Actual_Date, data.Fabric_Order_NO, data.Fabric_Actual_Order_Qty_Pcs, data.Fabric_Update_Date, data.Color_Order_Acceptance, data.Color_Order_Request_Date, data.Color_Order_Answer_Date, data.Color_Order_Actual_Date,
          data.Color_Order_NO, data.Color_Actual_Order_Qty_Pcs, data.Color_Update_Date, data.Trim_Order_Acceptance, data.Trim_Order_Request_Date, data.Trim_Order_Answer_Date, data.Trim_Order_Actual_Date, data.Trim_Order_NO, data.Trim_Actual_Order_Qty_Pcs, data.Trim_Update_Date, data.PO_Order_Acceptance, data.PO_Order_Request_Date, data.PO_Order_Answer_Date, data.PO_Order_Actual_Date,
          data.PO_Order_NO, data.PO_Actual_Order_Qty_Pcs, data.PO_Update_Date, data.Order_Qty_Pcs_Old, data.Transport_Method_Name_Old, data.Logistics_Type_Name_Old, data.Yarn_Order_Request_Date_Old, data.Fabric_Order_Request_Date_Old, data.Color_Order_Request_Date_Old, data.Trim_Order_Request_Date_Old, data.PO_Order_Request_Date_Old, data.Status, data.Display_Month_WK, data.Display_Month_WK_Column, data.Group_Cd, data.Show_Color_Flag, data.Order_Qty_Coeff, data.Factory_Comment, data.Factory_Comment_Update_Date, data.FR_Fabric_Code, data.FR_Fabric_Name,
          data.Ph1_First_Discrimination_Flag_Old, data.Ph1_First_Discrimination_Flag, data.Order_Timing_Display_Value_Old, data.Order_Timing_Display_Value, data.Express_Line_Flag_Old, data.Express_Line_Flag, data.Manual_Lock_Flag_Old, data.Manual_Lock_Flag, data.Ph1_First_Discrimination_Flag_Now, data.Order_Timing_Display_Value_Now, data.Express_Line_Flag_Now, data.Manual_Lock_Flag_Now, data.Requested_Wh_Date_Old, data.EXF, data.Color_Recommend, data.Trim_Recommend, data.PO_Recommend, data.BD_EXF_DL_Setting_LT_Before_Cal, data.PO_EXF_DL_Setting_LT_Before_Cal,
          data.Material_Supplier_Holiday_Excluding, data.Sewing_FTY_Holiday_Excluding, data.BD_EXF_DL_Setting_LT, data.PO_EXF_DL_Setting_LT, data.BD_EXF_Registered_LT, data.PO_EXF_Registered_LT, data.BD_EXF_total_Abnormal_LT, data.PO_EXF_total_Abnormal_LT, data.Abnormal_LT_Reason_BD1, data.Abnormal_LT_Reason_BD2, data.Abnormal_LT_Reason_BD3, data.Abnormal_LT_Reason_BD4,
          data.Abnormal_LT_Reason_BD5, data.Abnormal_LT_BD1, data.Abnormal_LT_BD2, data.Abnormal_LT_BD3, data.Abnormal_LT_BD4, data.Abnormal_LT_BD5, data.Abnormal_LT_Reason_PO1, data.Abnormal_LT_Reason_PO2, data.Abnormal_LT_Reason_PO3, data.Abnormal_LT_Reason_PO4, data.Abnormal_LT_Reason_PO5, data.Abnormal_LT_PO1, data.Abnormal_LT_PO2, data.Abnormal_LT_PO3, data.Abnormal_LT_PO4, data.Abnormal_LT_PO5))
      }
      ordersService.saveOrder(reqObj).then((res) => {
        if (res.status) {
          message.success(res.internalMessage)
        }
      }).finally(() => {
        setLoading(false);
      })
    };
  }



  return (
    <>
      <Card title="Excel Import">
        <Form.Item>
          <input type="file" onChange={handleFileChange} />
        </Form.Item>
        <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
          disabled={formData.length == 0}
        >
          Upload
        </Button>
      </Card>
    </>
  );
}
