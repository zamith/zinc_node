 /*RECURSIVELY SEARCH FOR SPEAKER TAG IN THE XML OBJECT 
 AND RETURN DICTIONARY*/

var FindByTag = function(xml, tagName, dictionary){
	//IF XML IS NOT AN ARRAY OR OBJECT THE TAG CANNOT BE FOUND
	if(!Array.isArray(xml) && !(typeof xml === 'object')) return;

	let dictionaryHandler = (k) => {
	let upperKey = k.toUpperCase();
	if(!(upperKey === 'ALL')){
	  	(dictionary.hasOwnProperty(upperKey))? 
	  	dictionary[upperKey]++ : dictionary[upperKey] = 1;
	}
	}
	for(key in xml){
		if(key === tagName){
		  	if(!Array.isArray(xml[key])) xml[key] = [xml[key]];
		  	dictionaryHandler.apply(this, xml[key])
		} else {
		  	FindByTag(xml[key], tagName, dictionary);
		}
	}
	return dictionary;
}

module.exports = { FindByTag };