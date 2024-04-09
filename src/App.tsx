import React, { RefObject } from 'react';
import  {Canvas} from  "@react-three/fiber";
import { Stars } from '@react-three/drei';  
import './App.css';
import SignaturePad from 'react-signature-pad-wrapper';


function App() {

  const signaturePad: RefObject<SignaturePad> = React.useRef(null);

  const save=()=>{
    if(signaturePad.current)
      {  const signature:any = signaturePad.current.toDataURL("image/jpeg");
        console.log(signature);
        const link=document.createElement('a');
        link.href=signature;
        link.download='sign.png'
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link);

      }
  

  }

  const undo=()=>{

    if(signaturePad.current)
      {
        const data=signaturePad.current.toData();
        data?.pop();
        signaturePad.current.fromData(data)
      }
      
  }

  return (
    <>

    <div className=' h-screen  bg-gradient-to-r from-zinc-600 via-violet-600 to-gray-600 flex items-center justify-center m-10 rounded-md ' >

      <div className='w-1/2 h-1/2 rounded-md'>
      <SignaturePad  ref={signaturePad}  options={{minWidth:2, maxWidth:7, penColor: 'rgb(255,255,255)',backgroundColor:'rgb(0,0,0)',dotSize:3}}/>
          <div className='flex gap-4 w-60  mt-4 h-10'>
            <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full h-full rounded-md' onClick={()=>{save()}}>save</button>
            <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full h-full rounded-md' onClick={()=>signaturePad.current?.clear()}>clear</button>
           <button className='bg-gradient-to-r  from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full h-full rounded-md' onClick={()=>{
            undo()
           }}>
            undo

           </button>
          </div>

      </div>
   
        
    </div>
       
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
     </>
    

  );
}

export default App;
