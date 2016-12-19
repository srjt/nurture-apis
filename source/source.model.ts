import * as mongoose from "mongoose";
interface ISource{
    name:string;
    link:string;
    type:string;
    lastBuildDate: Date;
}

interface ISourceModel extends ISource, mongoose.Document{};
var sourceSchema = new mongoose.Schema({
    name: String,
    link: String,
    type: String,
    lastBuildDate: Date
});

let Source = mongoose.model<ISourceModel>("Source", sourceSchema);

export = Source;	
