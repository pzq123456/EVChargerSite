<template>
    <div class="followit--follow-form-container">
      <form action="https://api.follow.it/subscription-form/TWNSOGpCOERPMFF6aUp5TEZYcGNvZTM0MkxGOXdSQzhVQXU3WVhOeXBRZ3hCbno3RDhGYmY2VklHeExmTks1UEM1NHlsQzNodUdwdjZyYjFaZWxJNTdpclNFTU4vL0NFdm1kVksxSnJxTFRQeHBEdThJUWtiSVVFYjl4eU5jZVR8Ylh1Vm02bEYwTGhQTjhCL1ZLT3NKTG5KUXRJcDFyWlBER0ozNDVJdDk5TT0=/8" method="post">
        <div class="form-preview">
          <div class="preview-heading">
            <h5>Get new posts by email:</h5>
          </div>
          <div class="preview-input-field">
            <input type="email" name="email" required placeholder="Enter your email" spellcheck="false" />
          </div>
          <div class="preview-submit-button">
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </form>

    </div>
  </template>
  
  <script setup>
  // 这里可以添加组件的逻辑或数据
  </script>
  
  <style scoped>
.followit--follow-form-container {
    background-color: var(--vp-c-bg);
    padding: 1rem;
    border-radius: 8px;
    max-width: 400px;
}

.form-preview {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}



.preview-input-field input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--vp-c-border);
    border-radius: 4px;
    background-color: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
    font-family: var(--vp-font-family-base);
    font-size: 0.875rem;
}

/* 激活状态绿色边框 动画效果 */
.preview-input-field input:focus {
    border-color: var(--vp-c-brand-3);
    transition: border-color 0.2s ease;
    caret-color: var(--vp-c-brand-2);
}

.preview-input-field input::placeholder {
    color: var(--vp-c-text-3);
}

.preview-submit-button button {
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    border: 1px solid var(--vp-c-border);
    font-family: var(--vp-font-family-base);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.preview-submit-button button:hover {
    /* background-color: var(--vp-c-brand-2); */
    border-color: var(--vp-c-brand-2);
}

.preview-submit-button button:active {
    background-color: var(--vp-c-brand-1);
}
  </style>