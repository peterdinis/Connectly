"use client"

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { NextPage } from "next";

const DashboardPage: NextPage = () => {
    const {user} = useKindeAuth()
    return (
        <>{user}</>
    )
}

export default DashboardPage;