<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AdviceTopic, Hexagram } from '../data/hexagrams'
import { hexagrams } from '../data/hexagrams'

const currentHexagram = ref<Hexagram | null>(null)
const history = ref<Hexagram[]>([])
const isCasting = ref(false)
const lastCastAt = ref('')

const adviceGroups = [
  {
    id: 'life',
    label: '人生主题解挂',
    description: '姻缘、事业、前程、吉凶、寿命、子孙、健康',
    options: [
      { key: 'love', label: '姻缘' },
      { key: 'career', label: '事业' },
      { key: 'future', label: '前程' },
      { key: 'fortune', label: '吉凶' },
      { key: 'longevity', label: '寿命' },
      { key: 'descendants', label: '子孙' },
      { key: 'health', label: '健康' },
    ],
  },
  {
    id: 'roles',
    label: '互联网岗位解挂',
    description: '研发、产品、运营、测试等团队角色',
    options: [
      { key: 'rdPc', label: '研发 · PC客户端' },
      { key: 'rdMobile', label: '研发 · 移动客户端' },
      { key: 'frontend', label: '研发 · 前端' },
      { key: 'backend', label: '研发 · 服务端' },
      { key: 'pm', label: '产品' },
      { key: 'ops', label: '运营' },
      { key: 'qa', label: '测试' },
    ],
  },
  {
    id: 'work',
    label: '职场关切解挂',
    description: '年终奖、周任务、晋升、压力等话题',
    options: [
      { key: 'bonus', label: '年终奖' },
      { key: 'sprint', label: '周任务' },
      { key: 'promotion', label: '下一年晋升' },
      { key: 'stress', label: '工作压力' },
    ],
  },
]

const elementNotes: Record<Hexagram['element'], { label: string; detail: string }> = {
  木: {
    label: '木 · 生长之势',
    detail: '以渐进堆叠触发创新，让新芽拥有呼吸空间与阳光。',
  },
  火: {
    label: '火 · 明德之耀',
    detail: '用清晰叙事与热情感染伙伴，但需防止情绪过热。',
  },
  土: {
    label: '土 · 承载之基',
    detail: '先稳固制度与供给，再让变化落地生根。',
  },
  金: {
    label: '金 · 肃正之气',
    detail: '果断划定界限，透过秩序与规范释放效率。',
  },
  水: {
    label: '水 · 智润之道',
    detail: '保持弹性与同理，用流动的视角解决复杂局面。',
  },
}

const interpretations = computed(() => {
  if (!currentHexagram.value) {
    return [
      {
        title: '卦辞洞见',
        text: '点击「摇卦」即可从六十四卦中抽取一卦，系统会即时生成洞见。',
      },
      {
        title: '象传观照',
        text: '卦象意象会提示正在酝酿的气候，从环境角度理解当下位置。',
      },
      {
        title: '应用策略',
        text: '结合实际议题，给出行动建议与节奏提醒，方便落地执行。',
      },
      {
        title: '五行启示',
        text: '附带五行视角，帮助你在组织与情绪层面调和力量。',
      },
    ]
  }

  const hex = currentHexagram.value
  const element = elementNotes[hex.element]

  return [
    { title: '卦辞洞见', text: hex.classic },
    { title: '象传观照', text: hex.imagery },
    { title: '应用策略', text: hex.practice },
    {
      title: element.label,
      text: `${element.detail} 结合关键词「${hex.keywords.join('、')}」即可形成系统性的调整。`,
    },
  ]
})

const castHexagram = () => {
  if (isCasting.value) return
  isCasting.value = true

  const spinDuration = 520
  window.setTimeout(() => {
    const index = Math.floor(Math.random() * hexagrams.length)
    const selection = hexagrams[index]
    if (!selection) {
      isCasting.value = false
      return
    }
    currentHexagram.value = selection
    history.value = [selection, ...history.value.filter((item) => item.id !== selection.id)].slice(0, 5)
    lastCastAt.value = new Date().toLocaleString('zh-CN', { hour12: false })
    isCasting.value = false
  }, spinDuration)
}

const lastKeywords = computed(() => currentHexagram.value?.keywords ?? ['专注', '沉淀', '觉察'])
const groupedAdvice = computed(() => {
  if (!currentHexagram.value) return []
  return adviceGroups.map((group) => ({
    ...group,
    advice: group.options.map((opt) => ({
      key: opt.key,
      label: opt.label,
      text: currentHexagram.value.advice?.[opt.key as AdviceTopic] ?? '',
    })),
  }))
})
</script>

<template>
  <section class="space-y-10">
    <div
      class="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-6 shadow-oracle backdrop-blur-xl sm:p-10"
    >
      <div class="absolute inset-0 opacity-60 mix-blend-screen grid-overlay"></div>
      <div class="relative z-10 flex flex-col gap-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="font-sansBrand text-xs uppercase tracking-[0.4em] text-gold">Oracle Pulse</p>
            <h2 class="mt-2 text-3xl font-serifBrand leading-tight text-sand sm:text-4xl">
              {{ currentHexagram?.nameCn ?? '易境待启' }}
              <span class="ml-3 text-base font-sansBrand text-gold/80">
                {{ currentHexagram ? currentHexagram.nameEn : 'Shake to reveal' }}
              </span>
            </h2>
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-3 rounded-full border border-gold/30 bg-gradient-to-r from-amber-400/90 via-rose-400/80 to-amber-500/80 px-6 py-3 font-sansBrand text-[0.65rem] uppercase tracking-[0.45em] text-ink shadow-lg shadow-amber-900/50 transition-all hover:-translate-y-0.5 hover:shadow-amber-900/70 disabled:cursor-not-allowed disabled:opacity-60"
            @click="castHexagram"
            :disabled="isCasting"
          >
            <span v-if="!isCasting">摇卦</span>
            <span v-else class="flex items-center gap-2">
              <span class="h-3 w-3 animate-ping rounded-full bg-ink"></span>
              生成中
            </span>
          </button>
        </div>

        <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article class="rounded-2xl border border-white/10 bg-obsidian/60 p-6">
            <p class="text-sm uppercase tracking-[0.35em] text-slate-300/80">卦象档案</p>
            <div class="mt-4 space-y-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <p class="text-xs text-white/50">序位</p>
                  <p class="text-2xl font-serifBrand">{{ currentHexagram?.id ?? '--' }}</p>
                </div>
                <div>
                  <p class="text-xs text-white/50">拼音</p>
                  <p class="text-xl font-serifBrand text-gold">{{ currentHexagram?.pinyin ?? 'Yì' }}</p>
                </div>
              </div>
              <div>
                <p class="text-xs text-white/50">关键词</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="word in lastKeywords"
                    :key="word"
                    class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-sansBrand tracking-wide text-white/80"
                  >
                    {{ word }}
                  </span>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span class="font-sansBrand uppercase tracking-[0.4em] text-xs">HEXAGRAM</span>
                <span class="text-3xl font-serifBrand tracking-[0.1em]">
                  {{ currentHexagram ? `${currentHexagram.id.toString().padStart(2, '0')}` : '00' }}
                </span>
                <span v-if="lastCastAt" class="text-xs text-white/50">最近摇卦：{{ lastCastAt }}</span>
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-white/10 bg-gradient-to-br from-dusk/50 via-obsidian to-ink p-6 text-white">
            <p class="text-xs uppercase tracking-[0.35em] text-gold">卦史速记</p>
            <p class="mt-3 text-base leading-relaxed text-white/85">
              <span v-if="currentHexagram">{{ currentHexagram.classic }}</span>
              <span v-else>记录当下的提问，点击摇卦让传统易理为你的项目注入新视角。</span>
            </p>
            <div class="mt-6 space-y-2">
              <p class="text-xs text-white/60">最近抽到</p>
              <TransitionGroup name="fade" tag="div" class="flex flex-wrap gap-2">
                <span
                  v-for="item in history"
                  :key="item.id"
                  class="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-sansBrand tracking-wide"
                >
                  {{ item.id }} · {{ item.nameCn }}
                </span>
              </TransitionGroup>
              <p v-if="!history.length" class="text-xs text-white/45">尚无历史记录。</p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
      <TransitionGroup name="scale" class="contents">
        <article
          v-for="card in interpretations"
          :key="card.title"
          class="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/85 shadow-lg shadow-black/40 backdrop-blur"
        >
          <p class="font-sansBrand text-xs uppercase tracking-[0.4em] text-gold">{{ card.title }}</p>
          <p class="mt-3 leading-relaxed">{{ card.text }}</p>
        </article>
      </TransitionGroup>
    </div>

    <section class="space-y-4">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="font-sansBrand text-xs uppercase tracking-[0.4em] text-gold">Multi-Context Reading</p>
          <h3 class="text-2xl font-serifBrand text-sand">专题解挂矩阵</h3>
        </div>
        <p class="text-xs text-white/60">覆盖情感、职场岗位与年度关切，随卦象同步调整策略。</p>
      </div>

      <div v-if="groupedAdvice.length" class="space-y-6">
        <div
          v-for="group in groupedAdvice"
          :key="group.id"
          class="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/40 backdrop-blur"
        >
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="font-sansBrand text-xs uppercase tracking-[0.35em] text-gold">{{ group.label }}</p>
              <p class="text-sm text-white/70">{{ group.description }}</p>
            </div>
            <p class="text-xs text-white/50">基于当前卦象 {{ currentHexagram?.nameCn }} · {{ currentHexagram?.nameEn }}</p>
          </div>

          <div class="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="card in group.advice"
              :key="card.key"
              class="rounded-2xl border border-white/10 bg-gradient-to-br from-obsidian/70 via-ink/80 to-obsidian/70 p-4 text-sm text-white/85"
            >
              <p class="font-sansBrand text-[0.7rem] uppercase tracking-[0.4em] text-amber-200/80">{{ card.label }}</p>
              <p class="mt-2 leading-relaxed">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-white/60">摇卦后将根据卦象生成对应领域的建议。</p>
    </section>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
