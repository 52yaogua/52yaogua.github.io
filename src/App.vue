<script setup lang="ts">
import YijingCaster from './components/YijingCaster.vue'
</script>

<template>
  <div class="relative isolate overflow-hidden bg-ink text-sand">
    <div class="absolute inset-0 grid-overlay opacity-40"></div>
    <div class="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full orb-gradient blur-3xl opacity-70"></div>
    <div class="pointer-events-none absolute bottom-[-15%] left-[-5%] h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-jade/20 via-dusk/30 to-transparent blur-3xl opacity-65"></div>

    <div class="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-12 sm:px-10 lg:pt-20">
      <header class="space-y-6 text-left">
        <p class="font-sansBrand text-xs uppercase tracking-[0.55em] text-gold">Yijing Resonance Lab</p>
        <h1 class="text-4xl font-serifBrand leading-tight text-sand sm:text-5xl lg:text-6xl">
          易经开卦工作台
          <span class="block text-lg font-sansBrand text-white/70 lg:text-xl">
            一键摇卦 · 多重解读 · 同时兼顾桌面与移动体验
          </span>
        </h1>
        <p class="max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
          收录完整六十四卦资料库。点击「摇卦」即可抽取当下卦象，系统会给出卦辞洞见、象传观照、现代应用与五行启示，帮助你在产品策划、团队协作或个人抉择中找到新的参照。
        </p>
        <div class="grid gap-4 text-xs font-sansBrand uppercase tracking-[0.4em] text-white/70 sm:grid-cols-3">
          <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">64 Hexagrams</div>
          <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Multi Method Insights</div>
          <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Responsive Layout</div>
        </div>
      </header>

      <main>
        <YijingCaster />
      </main>

      <footer class="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 text-xs text-white/60">
        <p>基于 Vue 3 · Vite · Tailwind CSS 构建 | 灵感来自易经「动静互参」的观察方式。</p>
      </footer>
    </div>
  </div>
</template>
