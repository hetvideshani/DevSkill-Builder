import mongoose,{Schema, Document} from "mongoose";

export interface Example extends Document{
    input:string;
    output:string
}

const ExampleSchema:Schema<Example> = new Schema({
    input:{
        type:String,
        required:true,
    },
    output:{
        type:String,
        required:true,
    },
});

export interface Problem extends Document{
    problem_id: number;
    problem_title: string;
    time_limit: number;
    max_memory:number;
    problem_statement:string;
    input_statement:string;
    output_statement:string;
    examples:Example[];
	level: "easy"| "medium" | "hard" | "expert";
    category: [string]
}

const ProblemSchema:Schema<Problem> = new Schema({
    problem_id:{
        type:Number,
        required:true,
        unique:true
    },
    problem_title:{
        type:String,
        required:true,
        unique: true
    },
    time_limit:{
        type:Number,
        required:true,
    },
    max_memory:{
        type:Number,
        required:true,
    },
    problem_statement:{
        type:String,
        required:true,
        unique: true
    },
	input_statement:{
		type:String,
		required:true,
	},
	output_statement:{
		type:String,
		required:true,
	},
	examples:[ExampleSchema],
	level:
	{
		type:String,
		required:true,
		enum: ["easy", "medium", "hard", "expert"],
	},
	category:
	{
		type:[String],
		required:true
	},
});

const ProblemModel = (mongoose.models.problems) || mongoose.model<Problem>("problems",ProblemSchema);

export default ProblemModel;

