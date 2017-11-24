$(function() {
	// 初期値を設定しておく
	var changeFlg = 0;
	var testCount = 100;
	var doorCount = 3;
	var resultCount = 0;
	var total = 0;

	execute()

	function execute()
	{
		// 前回の答えをクリア
		$("#answer").html("");

		// 設定値を取得する
		changeFlg = $("input[name=change_flg]:checked").val();
		testCount = $("select[name=test_count]").val();
		doorCount = $("select[name=door_count]").val();

		// 当たりの回数を取得
		var resultCount = 0;
		for (var i = 0; i < testCount; i++) {
			// ドアを選択する
			var selectNum = Math.floor(Math.random() * doorCount);
			
			// モンティホール問題へチャレンジする
			var result = montyhall(selectNum, changeFlg);
			if (result) {
				resultCount++;
			}
		}

		// 結果の割合を計算する
		total = Math.round(resultCount * 1000 / testCount) / 10;

		// 結果表示
		$("#result").html("total : " + total + "%");
	}

	function montyhall(selectNum, changeFlg)
	{
		// ドアの配列を用意
		var doorArray = new Array(doorCount);

		// 当たりのドアをセットする
		var answerNum = Math.floor(Math.random() * doorCount);

		// 選択しなかった残りのドアのうちハズレをオープン
		var openCounter = 0;
		for (var i = 0; i < doorCount; i++) {
			// 残り２つになったら強制的に終了
			if (doorCount - 2 <= openCounter) {
				break;
			}

			// 選んだドアと当たりは除外する
			if (i != selectNum && i != answerNum) {
				doorArray[i] = true;
				openCounter++;
			}
		}

		// ここでドアを変更するかどうか
		if (changeFlg != 0) {
			for (var i = 0; i < doorCount; i++) {
				// 最初に選んだドアじゃなくて、まだ開いていないドアにする
				if (selectNum != i && doorArray[i] != true) {
					selectNum = i;
					break;
				}
			}
		}

		// 答え合わせ
		var answer = answerNum == selectNum;

		// 結果を表示
		$("#answer").append("answer : " + answer);
		$("#answer").append("&nbsp;&nbsp;&nbsp;&nbsp;answerNum : " + answerNum);
		$("#answer").append("&nbsp;&nbsp;&nbsp;&nbsp;selectNum : " + selectNum + "<br>");

		return answer;
	}

	$("#execute_btn").on("click", function() {
		execute();
	});
});
