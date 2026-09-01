const UserManagementTable = ({ users }) => {
    return ( 
        <table className="bg-white font-medium leading-[1.25rem] rounded-[1rem] text-[0.875rem] text-text-muted-foreground shadow-sm w-full h-fit">
            <thead className="">
                <tr className="">
                    <th className="flex justify-center px-[0.3125rem] py-[0.5rem]">عملیات</th>
                    <th className=" px-[0.3125rem] py-[0.5rem]">وضعیت</th>
                    <th className=" px-[0.3125rem] py-[0.5rem]">تاریخ عضویت</th>
                    <th className=" px-[0.3125rem] py-[0.5rem]">نظام پزشکی</th>
                    <th className=" px-[0.3125rem] py-[0.5rem]">نقش</th>
                    <th className=" px-[0.3125rem] py-[0.5rem]">کاربر</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={ user.id }>
                        <td className="px-[0.3125rem] py-[0.5rem]">{ user.createdAt }</td>
                        <td className="px-[0.3125rem] py-[0.5rem]">{user.nationalCode || '—'}</td>
                        <td className="px-[0.3125rem] py-[0.5rem]">{user.role === 'patient' ? 'بیمار' : 'پزشک'}</td>
                        <td className="px-[0.3125rem] py-[0.5rem] text-black">{ user.name }</td>
                    </tr>
                ))}
            </tbody>
        </table>
     );
}
 
export default UserManagementTable;