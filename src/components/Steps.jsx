const Steps = () => {
    return ( 
        <div className="flex flex-col gap-[2rem] h-fit px-[2rem] py-[4rem] w-full">
            <h2 className="font-vazir font-extrabold text-[1.5rem]">از آپلود تا تشخیص، فقط سه قدم</h2>
            <ol className="flex flex-1 gap-[1rem]">
                <li className="border border-text-muted-foreground/20 flex flex-1 flex-col gap-[0.5rem] pb-[3.25rem] pt-[1.5rem] px-[1.5rem] rounded-[1.4rem]">
                    <div className="flex justify-between">
                        <span className="w-full h-full">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 18.4C0 8.23796 8.23796 0 18.4 0H25.6C35.762 0 44 8.23796 44 18.4V25.6C44 35.762 35.762 44 25.6 44H18.4C8.23796 44 0 35.762 0 25.6V18.4Z" fill="#E2F0FF"/>
                                <path d="M17 30.3334C16.558 30.3334 16.134 30.1578 15.8215 29.8452C15.5089 29.5326 15.3333 29.1087 15.3333 28.6667V15.3334C15.3333 14.8913 15.5089 14.4674 15.8215 14.1548C16.134 13.8423 16.558 13.6667 17 13.6667H23.6666C23.9304 13.6663 24.1917 13.718 24.4354 13.819C24.6791 13.92 24.9005 14.0682 25.0866 14.255L28.0766 17.245C28.264 17.4313 28.4126 17.6528 28.5139 17.8968C28.6152 18.1408 28.6671 18.4025 28.6666 18.6667V28.6667C28.6666 29.1087 28.4911 29.5326 28.1785 29.8452C27.8659 30.1578 27.442 30.3334 27 30.3334H17Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M23.6667 13.6667V17.8334C23.6667 18.0544 23.7545 18.2663 23.9108 18.4226C24.067 18.5789 24.279 18.6667 24.5 18.6667H28.6667" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22.0001 22V27" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M24.5001 24.5L22.0001 22L19.5001 24.5" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span aria-hidden="true" className="font-black leading-[2.5rem] opacity-5 text-text-muted-foreground text-[1.875rem]">1</span> 
                    </div>
                    <h3 className="font-bold text-[1rem]">آپلود</h3>  
                    <p className="font-normal text-text-muted-foreground text-[0.875rem]">فایل خام ۱۲ لیدی را آپلود کنید یا دستگاه را متصل کنید.</p>
                </li>
                <li className="border border-text-muted-foreground/20 flex flex-1 flex-col gap-[0.5rem] pb-[3.25rem] pt-[1.5rem] px-[1.5rem] rounded-[1.4rem]">
                    <div className="flex justify-between">
                        <span className="w-full h-full">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 18.4C0 8.23796 8.23796 0 18.4 0H25.6C35.762 0 44 8.23796 44 18.4V25.6C44 35.762 35.762 44 25.6 44H18.4C8.23796 44 0 35.762 0 25.6V18.4Z" fill="#E2F0FF"/>
                                <path d="M22 16.1667C22.001 15.8334 21.9353 15.5032 21.8068 15.1957C21.6784 14.8881 21.4897 14.6094 21.2519 14.3758C21.0141 14.1422 20.732 13.9586 20.4222 13.8356C20.1124 13.7127 19.7812 13.6529 19.4479 13.6598C19.1147 13.6668 18.7862 13.7403 18.4818 13.8761C18.1774 14.0118 17.9032 14.2071 17.6754 14.4503C17.4475 14.6936 17.2706 14.98 17.1551 15.2926C17.0395 15.6053 16.9877 15.9379 17.0025 16.2708C16.5127 16.3968 16.0579 16.6325 15.6727 16.9603C15.2875 17.288 14.9819 17.6991 14.7791 18.1624C14.5762 18.6257 14.4815 19.1291 14.502 19.6344C14.5225 20.1398 14.6578 20.6338 14.8975 21.0792C14.476 21.4216 14.1445 21.8619 13.932 22.3616C13.7194 22.8614 13.6322 23.4055 13.6778 23.9467C13.7235 24.4878 13.9007 25.0096 14.194 25.4667C14.4873 25.9237 14.8879 26.3022 15.3609 26.5692C15.3025 27.021 15.3373 27.4801 15.4633 27.9179C15.5892 28.3558 15.8036 28.7632 16.0932 29.115C16.3827 29.4667 16.7414 29.7554 17.1469 29.9631C17.5524 30.1709 17.9962 30.2933 18.4508 30.3228C18.9055 30.3523 19.3614 30.2883 19.7903 30.1347C20.2193 29.9811 20.6122 29.7412 20.9448 29.4298C21.2774 29.1184 21.5427 28.7421 21.7242 28.3242C21.9056 27.9063 21.9995 27.4556 22 27V16.1667Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.5 22.8333C20.1996 22.5872 20.8106 22.1392 21.2556 21.5458C21.7006 20.9525 21.9596 20.2406 22 19.5" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.0025 16.2708C17.019 16.6739 17.1328 17.0671 17.3342 17.4166" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.8975 21.08C15.05 20.9558 15.2131 20.8454 15.385 20.75" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17 27C16.4257 27.0003 15.8611 26.8522 15.3608 26.57" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 22.8333H25.3333" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 27H27C27.442 27 27.866 27.1756 28.1785 27.4882C28.4911 27.8007 28.6667 28.2246 28.6667 28.6667V29.5" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 18.6667H28.6667" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M25.3333 18.6667V16.1667C25.3333 15.7246 25.5089 15.3007 25.8215 14.9882C26.134 14.6756 26.558 14.5 27 14.5" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M25.3334 23.25C25.5635 23.25 25.75 23.0635 25.75 22.8334C25.75 22.6032 25.5635 22.4167 25.3334 22.4167C25.1032 22.4167 24.9167 22.6032 24.9167 22.8334C24.9167 23.0635 25.1032 23.25 25.3334 23.25Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M27 14.9166C27.2301 14.9166 27.4166 14.7301 27.4166 14.5C27.4166 14.2699 27.2301 14.0833 27 14.0833C26.7699 14.0833 26.5833 14.2699 26.5833 14.5C26.5833 14.7301 26.7699 14.9166 27 14.9166Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M28.6667 29.9166C28.8968 29.9166 29.0833 29.7301 29.0833 29.5C29.0833 29.2699 28.8968 29.0833 28.6667 29.0833C28.4365 29.0833 28.25 29.2699 28.25 29.5C28.25 29.7301 28.4365 29.9166 28.6667 29.9166Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M28.6667 19.0833C28.8968 19.0833 29.0833 18.8968 29.0833 18.6667C29.0833 18.4365 28.8968 18.25 28.6667 18.25C28.4365 18.25 28.25 18.4365 28.25 18.6667C28.25 18.8968 28.4365 19.0833 28.6667 19.0833Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span aria-hidden="true" className="font-black leading-[2.5rem] opacity-5 text-text-muted-foreground text-[1.875rem]">2</span> 
                    </div>
                    <h3 className="font-bold text-[1rem]">تحلیل مدل</h3>  
                    <p className="font-normal text-text-muted-foreground text-[0.875rem]">مدل یادگیری عمیق گِش، سیگنال را پیش‌پردازش و طبقه‌بندی
                    می‌کند.</p>
                </li>
                <li className="border border-text-muted-foreground/20 flex flex-1 flex-col gap-[0.5rem] pb-[3.25rem] pt-[1.5rem] px-[1.5rem] rounded-[1.4rem]">
                    <div className="flex justify-between">
                        <span className="w-full h-full">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 18.4C0 8.23796 8.23796 0 18.4 0H25.6C35.762 0 44 8.23796 44 18.4V25.6C44 35.762 35.762 44 25.6 44H18.4C8.23796 44 0 35.762 0 25.6V18.4Z" fill="#E2F0FF"/>
                                <path d="M21.1667 13.6667V15.3334" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.1667 13.6667V15.3334" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.1667 14.5H15.3333C14.8913 14.5 14.4674 14.6756 14.1548 14.9882C13.8423 15.3007 13.6667 15.7246 13.6667 16.1667V19.5C13.6667 20.8261 14.1934 22.0979 15.1311 23.0355C16.0688 23.9732 17.3406 24.5 18.6667 24.5C19.9927 24.5 21.2645 23.9732 22.2022 23.0355C23.1399 22.0979 23.6667 20.8261 23.6667 19.5V16.1667C23.6667 15.7246 23.4911 15.3007 23.1785 14.9882C22.8659 14.6756 22.442 14.5 22 14.5H21.1667" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.6667 24.5C18.6667 25.8261 19.1934 27.0979 20.1311 28.0355C21.0688 28.9732 22.3406 29.5 23.6667 29.5C24.9927 29.5 26.2645 28.9732 27.2022 28.0355C28.1399 27.0979 28.6667 25.8261 28.6667 24.5V22" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M28.6667 22C29.5871 22 30.3333 21.2538 30.3333 20.3334C30.3333 19.4129 29.5871 18.6667 28.6667 18.6667C27.7462 18.6667 27 19.4129 27 20.3334C27 21.2538 27.7462 22 28.6667 22Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span aria-hidden="true" className="font-black leading-[2.5rem] opacity-5 text-text-muted-foreground text-[1.875rem]">3</span> 
                    </div>
                    <h3 className="font-bold text-[1rem]">تایید پزشک</h3>  
                    <p className="font-normal text-text-muted-foreground text-[0.875rem]">پزشک نتیجه را بازبینی و نظر نهایی را ثبت می‌کند.</p>
                </li>
            </ol>
        </div>
     );
}
 
export default Steps;