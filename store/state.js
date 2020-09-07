export default () => ({
    details: {},
    productName: "coke",
    tempDetails: {
    },
    documents: {},
    tempDocuments: {
       
    },
    submitResponse: null,
    hashkey:null,
    poppedSupportingDocs: [{
        role: "policyHolder",
        docName: "LOG files",
        docLabel: "Upload NRIC / FIN",
        docAdditionalLabel: "Please upload front and back in jpg, png, jpeg, bmp, gif, or pdf formats (up to 5 mb each)",
        docToolTip: "Please upload front and back in jpg, png, jpeg, bmp, gif, or pdf formats (up to 25 mb in total)",
        attachments: [{
            fieldName: "nricFront",
            fieldLabel: "NRIC Front",
            additionalFieldLabel: null,
            fieldHint: "upload NRIC",
            fieldMandatoryErrorMsg: "The NRIC is required.",
            isMandatory: true,
            maxFiles: 1,
            uploadedFiles: [{
                fileName: "",
                showPreview: null,
                originalFileName: "",
                fileType: "",
                file: null,
                imagePreview: ""
            }]
        }]
    },
],
    uploadFiles:{
    }

    /** TO-DO make error dialog as a component instead of residing in app.vue */
   // globalErrorDialog: false
});