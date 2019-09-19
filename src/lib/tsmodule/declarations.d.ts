declare module "ServiceData" {

    export interface ServiceData {

    }
}

declare module "ServiceUpdateData" {

    export interface ServiceUpdateData {

    }
}

declare module "Model" {

    interface Query {
        exec(cb: Function):Promise<any>
    }

    interface MongooseModel {
        save(cb: Function): Promise<any>,
        find(obj: object, projection?: string,cb?: Function): Query,
        findOne(filter: object, projection?: string,cb?: Function): Query,
        update(filter: object, dpdateoc: object, cb?: Function): any
    }

    interface JobModel extends MongooseModel {
        
    }

    interface ConfigModel extends MongooseModel {

    }

    export interface  Model {
        JobModel: JobModel,
        ConfigModel: ConfigModel
    }

}