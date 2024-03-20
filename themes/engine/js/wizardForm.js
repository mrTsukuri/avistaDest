require('zangdar');

document.querySelectorAll('.zangdar__wizard').forEach(form => {
    window.wizard = new Zangdar(form, {
        // onStepChange(step) {                       
        //     const breadcrumb = this.getBreadcrumb()                     
        //     buildSteps(breadcrumb)
        // },
        onValidation(step, fields, form) {
            if (step.labeled('2')) {
                const err_message = form.querySelector('.error__message')
                if (err_message) {
                    err_message.parentNode.removeChild(err_message)
                }                
                return true
            }
            return true
        },
        onSubmit(e) {
            e.preventDefault()
            this.getCurrentStep().active = false
            this.getCurrentStep().completed = true        
            // const breadcrumb = this.getBreadcrumb()
            // buildSteps(breadcrumb)
            // e.target.style.display = 'none'
            // document.getElementById('form-completed').style.display = 'block'
            return false
        }
    })
    
    // window.buildSteps = steps => {                     
    //     const $steps = document.getElementById('steps')        
    //     for (let label in steps) {                  
    //         if (steps.hasOwnProperty(label)) {
    //             const $li = document.querySelector('.choosing-tabs-btn');                        
    //             $li.classList.add('step-item')            
    //             if (steps[label].active) {                
    //                 document.querySelectorAll('.choosing-tabs-btn').forEach(item => {item.classList.remove('active')});
    //                 $li.classList.add('active');                                              
    //             }                                                                        
    //             $steps.appendChild($li)            
    //         }
    //     }
    //     let collection = $steps.querySelectorAll('.choosing-tabs-btn');
    //     let i = 0;
    //     while(!collection[i].classList.contains('active')){
    //         collection[i].classList.add('active');
    //         i++;
    //     }    
    // }
    
    // const breadcrumb = wizard.getBreadcrumb()         
    // buildSteps(breadcrumb)
    document.querySelectorAll('.next-step').forEach(item => {
        item.addEventListener('click', () => {  
            document.querySelector('.choosing-block').scrollIntoView({block: "start", behavior: "smooth"});            
        })
    })
    document.querySelectorAll('.prev-step').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.choosing-block').scrollIntoView({block: "start", behavior: "smooth"});                        
        })
    })
})