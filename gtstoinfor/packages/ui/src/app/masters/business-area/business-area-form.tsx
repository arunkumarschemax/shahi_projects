import { BusinessAreaReq } from "@project-management-system/shared-models";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";


export interface BusinessAreaFormProps {
    businessAreaData: BusinessAreaReq;
    updateDetails: (busarea: BusinessAreaReq) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }

export const BusinessAreaForm = (props:BusinessAreaFormProps) => {
    const navigate = useNavigate()
    return(
        <>
        <Card title={props.isUpdate ? 'Update Business Area' : 'Add Business Area'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/global/buyers/buyers-view')} type={'primary'}>View</Button></span>} size='small'>
        </Card>
        
        </>
    )

}

export default BusinessAreaForm