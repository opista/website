"use client";

import { useEffect, useRef } from "react";
import { createApp, defineComponent, h, ref, watch } from "vue";
import { SerializableRecord, useWhiteboard } from "vue-whiteboard-composable";

import defaultState from "./default-state.json"

const VueWhiteboard = defineComponent({
  setup() {
    const svgRef = ref<SVGSVGElement | null>(null);
    const color = ref("#3b82f6");
    const size = ref("16px");
    const mouseX = ref(0);
    const mouseY = ref(0);
    const isHovering = ref(false);
    const STORAGE_KEY = "whiteboard-demo-state";

    const getInitialState = (): SerializableRecord[] => {
      const typedDefaultState = defaultState as SerializableRecord[]
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) return typedDefaultState

        const parsed: SerializableRecord[] = JSON.parse(saved)
        return parsed?.length ? parsed : typedDefaultState
      } catch (e) {
        console.error('Failed to load state', e)
        return typedDefaultState
      }
    }

    const {
      canRedo,
      canUndo,
      clear,
      currentIndex,
      history,
      jumpTo,
      redo,
      removeFromHistory,
      save,
      serialize,
      undo,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useWhiteboard(svgRef, {
      backgroundColor: "transparent",
      color,
      initialState: getInitialState(),
      size,
    });

    watch(
      history,
      () => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize()));
        } catch (e) {
          console.error("Failed to save whiteboard state", e);
        }
      },
      { deep: true },
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.value) return;
      const rect = svgRef.value.getBoundingClientRect();
      mouseX.value = e.clientX - rect.left;
      mouseY.value = e.clientY - rect.top;
    };

    const highlightRecord = (index: number) => {
      const record = history.value[index]
      if (record?.type === 'line' && record.data) {
        const el = record.data
        el.classList.add('drop-shadow-sm/100')
      }
    }

    const unhighlightRecord = (index: number) => {
      const record = history.value[index]
      if (record?.type === 'line' && record.data) {
        const el = record.data
        el.classList.remove('drop-shadow-sm/100')
      }
    }

    const colors = [
      { name: "Blue", value: "#3b82f6" },
      { name: "Red", value: "#ef4444" },
      { name: "Green", value: "#22c55e" },
      { name: "Black", value: "#18181b" },
      { name: "Orange", value: "#f59e0b" },
    ];

    const sizes = [
      { label: "S", value: "2px" },
      { label: "M", value: "4px" },
      { label: "L", value: "8px" },
      { label: "XL", value: "16px" },
    ];

    const getSizeLabel = (value?: string) => {
      if (!value) return "M";
      return sizes.find((s) => s.value === value)?.label || value;
    };

    const renderIcon = (paths: string[]) =>
      h(
        "svg",
        {
          class: "w-4 h-4",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          viewBox: "0 0 24 24",
          xmlns: "http://www.w3.org/2000/svg",
        },
        paths.map((d) => h("path", { d })),
      );

    const iconDownload = ["M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2", "M7 11l5 5l5 -5", "M12 4l0 12"];
    const iconUndo = ["M9 14l-4 -4l4 -4", "M5 10h11a4 4 0 1 1 0 8h-1"];
    const iconRedo = ["M15 14l4 -4l-4 -4", "M19 10h-11a4 4 0 1 0 0 8h1"];
    const iconX = ["M18 6l-12 12", "M6 6l12 12"];

    const buttonClass =
      "rounded-lg not-prose cursor-pointer select-none inline-flex items-center text-white no-underline font-medium text-sm bg-blue-600 hover:bg-blue-700 focus:outline-0 focus-visible:ring-2 focus-visible:ring-pink-500 ring-offset-2 ring-offset-zinc-950 p-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const secondaryButtonClass =
      "rounded-lg not-prose cursor-pointer select-none inline-flex items-center text-zinc-100 no-underline font-medium text-sm bg-zinc-800 hover:bg-zinc-700 focus:outline-0 focus-visible:ring-2 focus-visible:ring-pink-500 ring-offset-2 ring-offset-zinc-950 p-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    return () =>
      h("div", { class: "flex flex-col gap-6 not-prose" }, [
        h("div", { class: "flex flex-wrap items-center justify-between gap-6" }, [
          h("div", { class: "flex flex-col gap-2" }, [
            h("span", { class: "text-xs font-bold uppercase tracking-widest" }, "Colour"),
            h("div", { class: "flex gap-2" }, [
              colors.map((c) =>
                h("button", {
                  class: [
                    "w-8 h-8 border-2 transition-transform hover:scale-110 rounded-lg",
                    color.value === c.value ? "border-pink-500 scale-120" : "border-white",
                  ],
                  onClick: () => (color.value = c.value),
                  style: { backgroundColor: c.value },
                  title: c.name,
                }),
              ),
            ]),
          ]),
          h("div", { class: "flex flex-col gap-2" }, [
            h("span", { class: "text-xs font-bold uppercase tracking-widest" }, "Size"),
            h("div", { class: "flex gap-2" }, [
              sizes.map((s) =>
                h(
                  "button",
                  {
                    class: [
                      "size-9 text-[11px] font-bold uppercase tracking-wider transition-colors border cursor-pointer rounded-lg",
                      size.value === s.value
                        ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                        : "bg-transparent text-zinc-100 border-zinc-100 hover:bg-zinc-900",
                    ],
                    onClick: () => (size.value = s.value),
                  },
                  s.label,
                ),
              ),
            ]),
          ]),
          h("div", { class: "flex flex-col gap-2" }, [
            h("span", { class: "text-xs font-bold uppercase tracking-widest" }, "Controls"),
            h("div", { class: "flex gap-2" }, [
              h(
                "button",
                {
                  "aria-label": "Undo",
                  class: secondaryButtonClass,
                  disabled: !canUndo.value,
                  onClick: undo,
                },
                [renderIcon(iconUndo)],
              ),
              h(
                "button",
                {
                  "aria-label": "Redo",
                  class: secondaryButtonClass,
                  disabled: !canRedo.value,
                  onClick: redo,
                },
                [renderIcon(iconRedo)],
              ),
              h(
                "button",
                {
                  "aria-label": "Save PNG",
                  class: buttonClass,
                  onClick: () =>
                    save().then((url) => {
                      if (url) {
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "whiteboard.png";
                        a.click();
                      }
                    }),
                },
                [renderIcon(iconDownload)],
              ),
            ]),
          ]),
        ]),

        h("div", { class: "flex flex-col sm:flex-row gap-6" }, [
          h("div", { class: "flex-1 flex flex-col gap-4" }, [
            h(
              "div",
              {
                class: "relative overflow-hidden bg-white h-full",
                style: {
                  backgroundImage: "radial-gradient(#e5e7eb 1.5px, transparent 0)",
                  backgroundSize: "24px 24px",
                },
              },
              [
                h(
                  "svg",
                  {
                    class: "w-full h-[500px] touch-none relative z-10 cursor-none",
                    onMouseenter: () => (isHovering.value = true),
                    onMouseleave: () => (isHovering.value = false),
                    onMousemove: handleMouseMove,
                    ref: svgRef,
                  },
                  [
                    isHovering.value &&
                    h("circle", {
                      cx: mouseX.value,
                      cy: mouseY.value,
                      fill: color.value,
                      "pointer-events": "none",
                      r: parseInt(size.value) / 2,
                      stroke: "rgba(0,0,0,0.1)",
                      "stroke-width": "0.5",
                    }),
                  ],
                ),
              ],
            ),
          ]),

          h(
            "div",
            {
              class:
                "sm:w-[220px] flex-shrink-0 flex flex-col border p-4 sm:h-[504px] h-[300px]",
            },
            [
              h("div", { class: "flex items-center justify-between mb-4 pb-4 border-b" }, [
                h("h3", { class: "text-xs font-bold uppercase tracking-widest" }, "History"),
                h(
                  "button",
                  {
                    class: "text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-400 disabled:opacity-0 transition-all cursor-pointer",
                    disabled: history.value.length === 0,
                    onClick: clear,
                  },
                  "Clear"
                ),
              ]),

              history.value.length > 0
                ? h(
                  "div",
                  {
                    class: "flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1",
                  },
                  history.value.map((item, index) =>
                    h(
                      "div",
                      {
                        class: [
                          "flex items-center justify-between p-2 transition-all group cursor-pointer border border-transparent",
                          index === currentIndex.value
                            ? "bg-zinc-800 shadow-sm"
                            : index > currentIndex.value
                              ? "opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:bg-zinc-700"
                              : "hover:bg-zinc-700",
                        ],
                        onClick: () => jumpTo(index),
                        onMouseenter: () => highlightRecord(index),
                        onMouseleave: () => unhighlightRecord(index),
                      },
                      [
                        h("div", { class: "flex flex-col gap-1 flex-1 min-w-0" }, [
                          h("div", { class: "flex items-center gap-2" }, [
                            h("div", {
                              class: "w-2.5 h-2.5 rounded-full border border-white/20 shadow-inner flex-shrink-0",
                              style: { backgroundColor: item.brush.color },
                            }),
                            h(
                              "span",
                              {
                                class: [
                                  "text-[11px] font-semibold truncate",
                                  index === currentIndex.value ? "text-blue-400" : "text-zinc-200",
                                ],
                              },
                              `Line #${index + 1}`,
                            ),
                          ]),
                          h("div", { class: "flex items-center gap-1.5" }, [
                            h("span", { class: "text-[9px]" }, getSizeLabel(item.brush.size)),
                            h("span", { class: "text-[9px]" }, "•"),
                            h(
                              "span",
                              { class: "text-[9px]" },
                              new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                            ),
                          ]),
                        ]),
                        h(
                          "button",
                          {
                            class:
                              "p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer",
                            onClick: (e: MouseEvent) => {
                              e.stopPropagation();
                              removeFromHistory(index);
                            },
                            title: "Remove from history",
                          },
                          [renderIcon(iconX)],
                        ),
                      ],
                    ),
                  ),
                )
                : h("div", { class: "flex-1 flex items-center justify-center" }, [
                  h("span", { class: "text-xs font-medium" }, "Start drawing to see history")
                ]),
            ],
          ),
        ]),
      ]);
  },
});

export const VueWhiteboardComposableDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const app = createApp(VueWhiteboard);
    app.mount(containerRef.current);

    return () => {
      app.unmount();
    };
  }, []);

  return <div className="mb-10" ref={containerRef} />;
};
