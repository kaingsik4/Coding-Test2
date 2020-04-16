//문제 출처 : https://www.acmicpc.net/problem/15954

//입출력 모듈 받아오기
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Input :전체 입력, Dolls :Input 중 첫줄을 제외, [N,K]= 첫째 줄 요소, answer = 최솟값을 구하기 위함
let Input = [];
let Dolls = [];
let N,K;
let answer = 987654321;

// 줄단위로 입력을 나누고 Input에 대입해줌
rl.on('line',function(value){
    value = value.split(' ').map((element)=>(parseInt(element)));
    Input.push(value);
})

// 동작
rl.on('close',function(){
    // shift()함수로 Input의 첫 요소를 반환하고 지워버림
    [N,K] = Input.shift();
    // Dolls는 첫째줄이 지워진 Input의 첫번째 요소(인형의정보)를 받아옴
    Dolls = Input[0];
    // 해결 함수를 호출함.
    Solve();
    // 정답을 출력.
    console.log(answer);
    // 시스템 정상종료.
    process.exit();
})

// std 편차를 계산함. 시작점과 start_index와 반복횟수 K를 매개변수로 받음
function Calculate_Value(start_index,_K)
{
    // 각각 평균 분산 편차임.
    let mean = 0;
    let variance = 0;
    let deviation = 0;

    for(let i = start_index ; i < (start_index+_K) ; ++i)
    {
        mean += Dolls[i];    
    }
    mean = mean / _K;
    for(let j = start_index ; j < (start_index+_K) ; ++j)
    {
        variance += Math.pow((Dolls[j]-mean),2);
    }
    variance = variance / _K;
    deviation = Math.sqrt(variance);
    // 편차를 반환함.
    return deviation
}

// 해결 함수
function Solve()
{
    for(let i = 0; i <= Dolls.length-K; ++i)
    {
        for(let j = K; j <= Dolls.length-i; ++j)
        {
            let min = Calculate_Value(i,j);
            answer = (answer < min) ? answer:min;
        }
    }
}