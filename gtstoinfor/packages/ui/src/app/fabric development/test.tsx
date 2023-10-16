import React, { useEffect, useState } from 'react';
// import { LayOutContent } from './layout-content';
import { UserOutlined } from '@ant-design/icons';
// import { HomePageOptionsEnum, UnitModel } from '@shahi-analytics/shared-models';
// import { InaAnalyticsServices } from '@shahi-analytics/shared-services';
import { Affix, Avatar, Button, Card, Col, Dropdown, MenuProps, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/units-bg-image.jpg';
import { UploadOutlined } from '@ant-design/icons';
import { Space, Upload } from 'antd';
import axios, { Axios } from 'axios';
import { RcFile } from 'antd/es/upload';


export const ImageUpload = React.memo(() => {
    // const [units, setUnits] = useState<UnitModel[]>([]);
    // const inaService = new InaAnalyticsServices();
    const parentFilesMap = new Map<string, RcFile[]>();
    // const [uploadedFiles, setUploadedFiles] = useState<Map<string, any[]>>(new Map()); // map of parent-item ot uploaded files
    // i.e. main => files, quality1 => files, quality2 => files

    useEffect(() => {

    }, []);

    const uploadFile = (file: RcFile, parent: string) => {
        let name = parent;
        if(!parentFilesMap.has(name)) {
            parentFilesMap.set(name, []);
        }
        parentFilesMap.get(name).push(file);
        return null;
    }

    const removeFile = (file) => {
        console.log(file);
        return true;
    }


    const saveFiles = () => {
        console.log(parentFilesMap);
        const otherFormContent = { name: "rajesh", email: "sampelemail"};
        const files = [];
        const data = new FormData();
        data.append('formContent', JSON.stringify(otherFormContent));

        parentFilesMap.forEach((uploadedFiles, parentKey) => {
            uploadedFiles.forEach(f => {
                // name: Q1+seperator+filename 
                // ex: Q1@photo1, Q1@photo2, MAIN@photo, Q2@photo1, Q2@pic1, Q3@myphoto
                const newFileName = parentKey+'@'+f.name;
                const n = new File([f], newFileName, { type: f.type });
                files.push(n);
                data.append('files', n);
            });
        });
        
        const config= {
            "headers": {
                "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
            }
        }

        axios.post("http://localhost:3006/ina/saveFiles", data, config).then(res => {
            console.log(res);
        }).catch(err => {
            console.log('ERROR');
            console.log(err);
        });
    }


    return (
        <>
            <div>
                Image Upload
            </div>
            <Upload
                action={ (file) => uploadFile(file, 'MAIN') }
                listType="picture"
                maxCount={3}
                multiple
                onRemove={(file) => removeFile(file)}
            >
                <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
            </Upload>
            
            <hr/>
            <Row>
                <Col lg={4} xxl={4} xl={4}>
                    QUALITY - 12
                    <Upload
                        action={ (file) => uploadFile(file, 'Q1') }
                        listType="picture"
                        maxCount={3}
                        multiple
                        onRemove={(file) => removeFile(file)}
                    >
                        <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
                    </Upload>
                </Col>
                <Col lg={4} xxl={4} xl={4}>
                    QUALITY - 2
                    <Upload
                        action={ (file) => uploadFile(file, 'Q2') }
                        listType="picture"
                        maxCount={3}
                        multiple
                        onRemove={(file) => removeFile(file)}
                    >
                        <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
                    </Upload>
                </Col>
            </Row>
            <hr/>
            <Button onClick={saveFiles}>
                <b>Save</b>
            </Button>
        </>
    );
});

export default ImageUpload;