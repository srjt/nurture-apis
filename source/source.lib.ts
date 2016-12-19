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
    public save(newSource, success, error){
        if(newSource){ 
            let sourceToSave = new Source(newSource);
            sourceToSave.save((err)=>{
                if(err){
                    error(err);
                }
                success(sourceToSave);
            });
        }
        else{
            error('No a valid Source');
        }
    }

}