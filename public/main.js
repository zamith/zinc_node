function clicked(){
	const url = "/analyze";
	$('#result').empty();
	//SHOW LOADING WHILE FETCHING DATA
	$('#result').append('<p>Loading</p>');
	//FETCH URL FROM THE INPUT
	let $url = document.getElementsByName("url")[0].value;
	let data = { $url };
	//ASYNC CALL
	$.post(url, data, {crossDomain: true})
	.done(function(result){
		$('#result').empty();
		//CONVERT RESULT OBJECT TO ARRAY AND SORT BY NUMLINES
		let sorted_dict = Object.keys(result).map( character => {
			return {character, numLines: result[character]}
		}).sort((a,b) => {
			return b.numLines - a.numLines;
		});
		//PREPARE TABLE HEADER
		$('#result').append('<table><tr><th>#</th><th>Character</th><th># Lines</th></tr></table>');
		//ADD TABLE ROWS
		sorted_dict.forEach( (row, index) => {
			let content = `<tr><td>${index+1}</td><td>${row.character}</td><td>${row.numLines}</td></tr>`;
			$('#result table').append(content);
		})
	});
}
