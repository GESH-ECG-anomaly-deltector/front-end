import { useAuth } from "../context/AuthContext";

const PatientHeader = () => {
    const { currentUser } = useAuth();
        
    return ( 
        <header className="bg-white border border-text-muted-foreground/24 flex justify-between items-center px-[0.9875rem] py-[0.7375rem] rounded-[1.4rem] shadow-sm w-full">
            <div className="flex flex-col">
                <span className="font-semibold leading-[1.25rem] text-[0.875rem]">{ currentUser.profile.name }</span>
                <span className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">پنل بیمار</span>
            </div>
            <div className="flex gap-[1.125rem] items-center">
                <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_10_425)">
                        <path d="M6.84521 14C6.96224 14.2027 7.13056 14.371 7.33324 14.488C7.53593 14.605 7.76584 14.6666 7.99988 14.6666C8.23392 14.6666 8.46383 14.605 8.66652 14.488C8.8692 14.371 9.03752 14.2027 9.15455 14" stroke="#152030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.17467 10.2173C2.08758 10.3128 2.0301 10.4315 2.00924 10.559C1.98837 10.6865 2.00501 10.8174 2.05714 10.9356C2.10926 11.0538 2.19462 11.1544 2.30284 11.225C2.41105 11.2956 2.53745 11.3332 2.66667 11.3333H13.3333C13.4625 11.3334 13.589 11.2959 13.6972 11.2254C13.8055 11.1549 13.891 11.0545 13.9433 10.9363C13.9955 10.8182 14.0123 10.6874 13.9916 10.5599C13.9709 10.4323 13.9136 10.3136 13.8267 10.218C12.94 9.30399 12 8.33266 12 5.33333C12 4.27246 11.5786 3.25505 10.8284 2.5049C10.0783 1.75476 9.06087 1.33333 8 1.33333C6.93914 1.33333 5.92172 1.75476 5.17157 2.5049C4.42143 3.25505 4 4.27246 4 5.33333C4 8.33266 3.05933 9.304 2.17467 10.2173Z" stroke="#152030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_10_425">
                        <rect width="16" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <div className="bg-primary/20 flex justify-center h-[2.25rem] items-center rounded-full w-[2.25rem]">
                    <span className="font-normal leading-[1rem] text-[0.75rem]">{ currentUser.profile.first2letters }</span>
                </div>
                
            </div>
        </header>
     );
}
 
export default PatientHeader;