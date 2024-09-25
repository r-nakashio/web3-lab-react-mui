/*Reactが提供する関数をインポート*/
import React, { useEffect, useState } from 'react'; //タイマー利用時にuseEffectのコメントアウト解除
/*以下四行で利用するMUIをインポート*/
import { Button, ButtonGroup, Typography, Stack, Box } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
//import PlayArrowIcon from '@mui/icons-material/PlayArrow'; //タイマー利用時にコメントアウト解除
//import StopIcon from '@mui/icons-material/Stop'; //タイマー利用時にコメントアウト解除
//import Web3 from "web3"; //Metamask連携時にコメントアウト解除

//カウンターコンポーネント
const Counter = () => {
  const INITIAL_COUNT = 0; //初期値

  const [count, setCount] = useState(INITIAL_COUNT); //カウント状態の定義
  /*配列の第一要素がカウントの実体。第二要素がカウントアップのための関数*/

  const recetCount = () => {
    setCount(INITIAL_COUNT);
  }; //カウントリセット

  const increCount = () => {
    setCount((prevcount) => ++prevcount);
  }; //カウントアップ

  const decreCount = () => {
    setCount((prevcount) => --prevcount);
  }; //カウントダウン
  
  //以下にJSXで<Counter>タグが呼び出すUIを記述
  return (
    <>
      <Box //MUIが提供するBOXコンポーネント
      sx={{
          boxShadow: 3,
          width: '40%',
          height: 100,
          bgcolor: 'success.main'
      }}>{/*sx内でBoxコンポーネントのデザインが可能(cssに非常に似た記述が可能)*/}
                <center><Typography variant={'h5'} color='white'>{count}</Typography></center>
                <center>
                  <ButtonGroup variant="contained" aria-label="Basic button group">
                  {/*以下にボタンとクリック時の動作(onClick=)を記述*/}
                  <Button onClick={increCount}>+</Button>
                  <Button onClick={decreCount}>-</Button>
                  <Button onClick={recetCount}><AutorenewIcon/></Button>
                  </ButtonGroup>
                </center>
      </Box>    
    </>
  );
};


//タイマーコンポーネント(タイマー利用時にコメントアウト解除)
/*
const Timer = () => {
  const INITIAL_COUNT = 0; //初期値
  const HUND_MSEC = 100; //今回は100ミリ秒経過毎にmsecをインリメントする
  const MAX_MSEC = 36000; //1時間まで計測可能(60 min * 60 sec * 10 msec)

  const [msec, setmSec] = useState(INITIAL_COUNT); //msec(ミリ秒)という状態を定義

  const [going, setGoing] = useState(false); //タイマーの再生と停止の状態定義

  const timeRecet = (setproc) => {
    setproc(INITIAL_COUNT);
  } //変数msecのリセット

  const toggleGoing = () => {
    setGoing(!going);
  } //再生と停止の切り替え

  const resetTimer = () => {
    if(going === true){toggleGoing();}
    timeRecet(setmSec);
  } //タイマー自体のリセット

  const countmSecUp = () => {
    if (going) { //もし停止中ならmsecは増えない
      //setIntervel(callback_proc, msec)でmsec毎にcallback_procを実行
      const goInterval = setInterval(() => {
        setmSec((prevMsec) => {
          if(prevMsec > MAX_MSEC - 1) {//msecの最大値を超えたらカウントストップして停止
            toggleGoing();
            return prevMsec;
          } else {
            return prevMsec + 1;
          }
        });
      }, HUND_MSEC);  
        
      return () => {
        clearInterval(goInterval); //クリーンアップ(初期化)関数
      };
    }
  }
    


  // eslint-disable-next-line
  useEffect(countmSecUp, [going]);
  //useEffect(callback_proc,[...])で配列内の変数が変化した場合callback_back関数内に記述されたクリーンアップを実行

  //msecを基準にsec,minを計算。
  //Math.floor:引数を整数値に変形、0${...}:二桁の文字列に変形、slice():2文字取り出し
  const openmsec = `0${msec % 10}`.slice(-1);
  const opensec = `0${Math.floor((msec / 10) % 60)}`.slice(-2);
  const openmin = `0${Math.floor((msec / 600) % 60)}`.slice(-2);

   //以下にJSXで<Counter>タグが呼び出すUIを記述
  return (
    <>
      <Box 
      sx={{
          boxShadow: 3,
          width: '40%',
          height: 100,
          bgcolor: 'text.disabled',
          overflow: 'hidden',
      }}>
          <Typography><center><p>{openmin}:{opensec}.{openmsec}</p></center></Typography>
          <center>
            <Button onClick={toggleGoing}>{going ? <StopIcon/> : <PlayArrowIcon/>}</Button>
            <Button onClick={resetTimer}><AutorenewIcon/></Button>
          </center>
      </Box>
    </>
  );

};
*/

// MetaMask接続コンポーネント(Metamask連携時にコメントアウト解除)
/*
const MetaMaskConnect = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // MetaMaskからアカウント取得の許可をリクエスト
        await window.ethereum.request({ method: 'eth_requestAccounts' }); 
        // web3インスタンスを生成
        const web3Instance = new Web3(window.ethereum); 
        setWeb3(web3Instance);

        // アカウントを取得
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert("MetaMaskがインストールされていません。");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
      });
    }
  }, []);

  //以下にJSXで<Counter>タグが呼び出すUIを記述
  return (
    <>
      <Box 
      sx={{
          boxShadow: 3,
          width: '40%',
          height: 100,
          bgcolor: 'info.main'
      }}>
        <center><Typography variant={'h6'} color='white'>
          {account ? `アカウントアドレス: ${account}` : "MetaMaskに接続してください"}
        </Typography></center>
        <center>
          {!account && <Button variant="contained" onClick={connectMetaMask}>MetaMaskに接続</Button>}
        </center>
      </Box>    
    </>
  );
};
*/

//index.jsに渡す、表示用関数
export default function App() 
{
  return (
  <>
    <Box sx ={{
      mt: 5,
    }}>
      <Stack spacing={5}>
        <center><Counter /></center>
        {/*<center><Timer /></center>*/}{/*タイマー利用時にコメントアウト解除*/}
        {/*<center><MetaMaskConnect /></center>*/}{/*Metamask連携時にコメントアウト解除*/}
      </Stack>
    </Box>
  </>
  );
}

// eslint-disable-next-line