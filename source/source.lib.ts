import * as Source from './source.model';


export class  SourceLib  {

    constructor(){
    }
    public getAll(success, error) {
        Source.find((err, sources)=>{
            if(err){
                error(err);
            }
            success(sources);
        });
    }
    public getByName(name, success, error){
        Source.find({name:name},(err, article)=>{
            if(err){
                error(error);
            }
            success(article);
        })
    }
    public save(newSource, success, error){
        if(newSource){ 
            this.getByName(newSource.name,()=>{
                error('Source already exists')
            },()=>{
                let sourceToSave = new Source(newSource);
                sourceToSave.save((err)=>{
                    if(err){
                        error(err);
                    }
                    success(sourceToSave);
                });    
            });
        }
        else{
            error('No a valid Source');
        }
    }

}