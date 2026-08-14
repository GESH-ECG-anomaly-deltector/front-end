const LoginForm = () => {
    return ( 
        <form action="" className="flex flex-col gap-[1rem]">
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="" className="">
                    شماره موبایل یا کد ملی
                </label>
                <input 
                    id=""
                    type="number"
                    dir="ltr"
                    placeholder="0913456997"
                    className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full" 
                />
            </div>
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="" className="pr-[0.5rem]">
                    رمز عبور
                </label>
                <input 
                    id=""
                    type="password"
                    dir="ltr"
                    placeholder="••••••••"
                    className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full" 
                />
            </div>
            <button type="submit" className="bg-primary px-[2rem] py-[0.625rem] rounded-[1.15rem] text-white">ورود به سامانه</button>
            <p className="text-center text-text-muted-foreground">
                حساب مدیر از پیش ساخته شده است.
                <span className="text-primary pr-[0.2rem]">ورود مدیر</span>
            </p>
        </form>
     );
}
 
export default LoginForm;