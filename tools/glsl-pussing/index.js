const tx = document.querySelector("#t") ;
const result = document.querySelector("#result") ;
if(tx != null && result != null){
    tx.addEventListener("input",function(){
        const data = tx.value ;
        
        const lines = data.split("\n") ;

        let ans = "" ;
        for(let i = 0 ; i < lines.length ; i ++ ){
            let line = lines[i] ;
            // 2つ以上のスペースを1つに
            line = line.replace(/ {2,}/g," ");
            // タブもすべて削除
            line = line.replace(/\t/g,"");
            // //以降を削除
            line = line.replace(/\/\/.*$/,"");
            ans += line ;
        }
        result.innerHTML = ans ;
    });
}
