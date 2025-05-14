// formConfig.js
export default {
  formProps: {
    labelWidth: "120px",
    class: "user-info-form"
  },
  sections: [
    {
      title: "Basic Information",
      items: [
        {
          type: "input",
          model: "institution",
          label: "Institution",
          required: true,
          placeholder: "Please enter your institution name"
        },
        {
          type: "input",
          model: "institutionalEmail",
          label: "Email Address",
          required: true,
          inputType: "email",
          rules: [
            {
              type: "email", 
              message: "Please enter a valid institutional email address", 
              trigger: "blur"
            }
          ],
          placeholder: "Please enter your institutional email address"
        },
        {
          type: "select",
          model: "title",
          label: "Title",
          required: true,
          options: [
            { label: "Prof.", value: "Prof." },
            { label: "Dr.", value: "Dr." },
            { label: "Mr.", value: "Mr." },
            { label: "Ms.", value: "Ms." }
          ],
          placeholder: "Please select a title"
        },
        {
          type: "input",
          model: "firstName",
          label: "First Name",
          required: true,
          placeholder: "Please enter your first name"
        },
        {
          type: "input",
          model: "lastName",
          label: "Last Name",
          required: true,
          placeholder: "Please enter your last name"
        },
        {
          type: "textarea",
          model: "justification",
          label: "Justification",
          required: true,
          rows: 6,
          placeholder: "Please provide a detailed justification for your request (at least 100 words), including whether it is for any research project",
          rules: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('Justification is required'));
                } else {
                  // 统计英文单词数
                  const wordCount = value.match(/\b\w+\b/g) ? value.match(/\b\w+\b/g).length : 0;
                  if (wordCount < 100) {
                    callback(new Error('Justification must be at least 100 words'));
                  } else {
                    callback();
                  }
                }
              },
              trigger: 'blur'
            }
          ]
        },
        {
          type: "upload",
          model: "signature",
          label: "Signature",
          required: true,
          accept: "image/jpeg,image/png",
          tip: "Please upload your signature image (PNG/JPG format supported)",
          showPreview: true,
          rules: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('Signature is required'));
                } else {
                  callback();
                }
              },
              trigger: 'change'
            }
          ]
        }
      ]
    }
  ]
};