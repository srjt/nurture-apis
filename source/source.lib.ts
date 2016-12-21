import * as Source from "./source.model";
var Promise = require("promise");
var _ = require("underscore");


export class  SourceLib  {

    constructor(){
    }
    public getAll() {
        return new Promise((fulfill, reject)=>{
            Source.find((err, sources)=>{
                if(err){
                    reject(err);
                }
                fulfill(sources);    
            });
        })
    }
    public getByName(name){
        return new Promise((fulfill, reject)=>{
            Source.find({name:name},(err, article)=>{
                if(err){
                    reject(err);
                }
                fulfill(article);
            });
        });
    }
    public doesSourceAreadyExist(name){
        return new Promise((fulfill, reject) =>{
            this.getByName(name).then((existingSource)=>{
                if(_.isNull(existingSource)){
                    fulfill(false);
                }
                fulfill(true);
            },(err)=>{
                reject(err);
            });
        });
    } 
    public validate(source){
        return new Promise((fulfill, reject)=>{
            if(_.isEmpty(source) || _.isEmpty(source.name) || _.isEmpty(source.link)){
                reject('Not a valid Source');
            }
            fulfill(source);
        })
    }   
    public save(newSource){
        return new Promise((fulfill, reject)=>{
            this.validate(newSource).then((source)=>{
                return this.doesSourceAreadyExist(newSource.name)
            }).then((exists)=>{
                if(exists){
                    reject("Source already exists \"" + newSource.name + "\"" );
                }
                else{ 
                    let sourceToSave = new Source(newSource);
                    sourceToSave.save((err)=>{
                        if(err){
                            reject(err);
                        }
                        fulfill(sourceToSave)
                    });
                }
            },(err)=>{
                reject(err);
            });
        });
    }
   
}