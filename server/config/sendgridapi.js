let ENV = process.env.NODE_ENV || 'development';



if(ENV === 'test' || ENV === 'development'){
    process.env.SENDGRID_API_KEY  = "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";
}