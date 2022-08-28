<script lang="ts">
  import MarkdownIt from 'markdown-it'

  const md = new MarkdownIt({
    html: false,
    xhtmlOut: false,
    breaks: true,
    langPrefix: 'language-',

    linkify: true,

    typographer: false,

    quotes: '“”‘’',

    highlight: function (/*str, lang*/) {
      return ''
    },
  })
  let text = ''
  $: renderRes = md.render(text)
</script>

<main>
  <input
    placeholder="请输入标题"
    class="h-[54px] border-b-solid border-b-[1px] border-b-[#d6d8dc] outline-none w-full text-[24px] font-bold pl-[25px] py-[15px]"
  />

  <div class="markdown-wrapper w-full h-[100vh] flex">
    <div
      class="markdown-editor w-[50%] border-r-solid border-r-[1px] border-r-[#d6d8dc] h-full bg-[#f8f9fa]"
    >
      <textarea
        on:keypress={(e) => {
          console.log(e)
        }}
        bind:value={text}
        class="w-full h-full bg-[#f8f9fa] p-[20px] outline-none"
      />
    </div>
    <div class="markdown-viewer w-[50%] h-full p-[20px] bg-[#ffffff]">
      {@html renderRes}
    </div>
  </div>
</main>

<style>
</style>
