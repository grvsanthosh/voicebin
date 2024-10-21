export const  randstring=(num)=> {
    const input = "jhjysDeFju4jniag5dpvlQ6UBDses7bOAU7lhNmEMPIyt3vgwqIk90J71oGiHYPqcuxyksyplmijknubdu7E10qj5chut3V4UEX";
    let string = '';
    for (let i =0;i<num;i++){
        let val = (Math.floor(Math.random()*100))%(input.length);
        string += input[val]
    }
    return string
    
}

