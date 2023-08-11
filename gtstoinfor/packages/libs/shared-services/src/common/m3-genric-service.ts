import { m3Config } from "../../config";
import axios from 'axios';


interface M3ApiArgs {
    key: string
    value: string
}

export class M3GenericService {
    private auth = 'Basic ' + Buffer.from(`${m3Config.USER_NAME}:${m3Config.PASSWORD}`).toString('base64');
    private headersRequest = {
        Authorization: `${this.auth}`,
    };
    private agent = {
        rejectUnauthorized: false,
    };

    async callM3Api(program: string, api: string, args: M3ApiArgs[]) {
        try {
            var baseUrl = 'https://172.17.3.115:23005/m3api-rest/execute/'
            let urlWithArgs = baseUrl + '/' + program + api + '?'
            let apiargs = ''
            for (const [index,arg] of args.entries()) {
                if((index+1) == args.length){
                    apiargs += apiargs + `${arg.key}=${arg.value}`
                }else{
                    apiargs += apiargs + `${arg.key}=${arg.value}&`
                }
            }
            const response = await axios.get(urlWithArgs, { headers: this.headersRequest, httpsAgent: this.agent });
            return response
        } catch (err) {
            return err
        }
    }
}