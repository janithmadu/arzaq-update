import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { cookies } from "next/headers";
import Image, { StaticImageData } from "next/image";


export interface UserSetting {
  id?: number;
  email?: string;
  family_name?: string;
  given_name?: string;
  picture?: string | StaticImageData;
  username?: string;
  phone_number?: string;
}




const UserSetting: React.FC<UserSetting> = async ({ given_name, picture }) => {
  
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {picture ? (
          // <Avatar>
          //   <AvatarImage src={picture} />
          // </Avatar>
          <div>
            <Image width={40} height={40} alt="User Avatar" src={picture}/>
          </div>
        ) : (
          <Avatar>
            <AvatarFallback>{given_name}</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/${locale}/profile/?page=1`}>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSetting;
