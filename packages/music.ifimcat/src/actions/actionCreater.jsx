export default function createAction(type,data = {}){
	return {
		type : type,
		data : data,
	}
}