import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Welcome() {
  return (
    <div className="flex h-screen justify-center items-center">
       <div className="flex flex-col items-center">
        <div>
          <Image src={"/logo.png"} alt="Logo" width={200} height={200}/>
        </div>
          <div className="text-4xl">
              BOOKWORM
          </div>
          <div className="m-2">
            The final place for all book enthusiasts
          </div>
          <div className="m-4">
              <Link href="/auth"><Button className="mr-2 hover:cursor-pointer" >SIGN IN </Button></Link>
              <Link href = "/auth"><Button className="mr-2 hover:cursor-pointer" >SIGN UP </Button></Link>
          </div>
       </div>
       
    </div>
  );
}


