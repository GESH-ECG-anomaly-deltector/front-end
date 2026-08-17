const ProcessingStatusPanel = ({ currentStep, steps }) => {
    const progressPercent = (currentStep / steps.length) * 100;

    return ( 
        // TODO: وقتی که هر مرحله تکمیل شد نوار پیشرفت باید پر بشه کم کم.
        <aside className="bg-white border border-text-muted-foreground/24 flex flex-1 flex-col gap-[1rem] h-fit p-[1.4875rem] rounded-[1.4rem] shadow-sm whitespace-nowrap">
            <h2 
                id="process-status-heading"
                className="flex font-bold gap-[0.5rem] items-center leading-[1.5rem] text-[1rem]">
                <span aria-hidden='true'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_10_611)">
                        <path d="M10.8313 5.17395C11.58 5.9239 12.0004 6.94027 12.0004 7.99995C12.0004 9.05963 11.58 10.076 10.8313 10.826" stroke="#2671D9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.7166 3.2887C13.9651 4.53872 14.6665 6.23325 14.6665 8.00003C14.6665 9.76681 13.9651 11.4613 12.7166 12.7114" stroke="#2671D9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.28341 12.7114C2.03482 11.4613 1.3335 9.76681 1.3335 8.00003C1.3335 6.23325 2.03482 4.53872 3.28341 3.2887" stroke="#2671D9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.16866 10.826C4.42 10.076 3.99951 9.05963 3.99951 7.99995C3.99951 6.94027 4.42 5.9239 5.16866 5.17395" stroke="#2671D9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.00008 9.33329C8.73646 9.33329 9.33341 8.73634 9.33341 7.99996C9.33341 7.26358 8.73646 6.66663 8.00008 6.66663C7.2637 6.66663 6.66675 7.26358 6.66675 7.99996C6.66675 8.73634 7.2637 9.33329 8.00008 9.33329Z" stroke="#2671D9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_10_611">
                        <rect width="16" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </span>
                وضعیت پردازش
            </h2>
            <div 
                role='progressbar' 
                aria-valuenow={ currentStep }
                aria-valuemin={0} 
                aria-valuemax={ steps.length } 
                className="bg-primary/20 h-[0.375rem] rounded-full w-full">
                    
                <div 
                    className="h-full bg-primary rounded-full" 
                    style={{width: `${ progressPercent }%`}}></div>
            </div>

            <ol className="flex flex-col gap-[1rem] pt[0.25rem] pb-[0.5rem]">
                {steps.map((step) => {
                    const isDone = step.id < currentStep;
                    const isActive = step.id === currentStep;

                    return (
                        <li key={ step.id } className="flex gap-[0.75rem] items-center">
                            <span aria-hidden='true' className= {`h-[1.75rem] flex items-center justify-center w-[1.75rem] rounded-full ${
                                isDone
                                    ? 'bg-primary text-white'
                                    : isActive
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-gray-100 text-accent'
                            }`}>
                                {isDone ? '✓' : step.id }</span>
                            <span className={`font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground ${ isDone || isActive ? 'text-black' : 'text-text-muted-foreground'}`}>{ step.label }</span>
                        </li>
                    )
                })}
            </ol>
            <p className="bg-primary/5 font-normal leading-[1.5rem] p-[0.75rem] text-text-muted-foreground text-[0.75rem] rounded-[1.15rem]">
                خروجی مدل جایگزین نظر پزشک نیست و صرفاً ابزار کمکی برای غربالگری اولیه است.
            </p>
        
        </aside>
     );
}
 
export default ProcessingStatusPanel;