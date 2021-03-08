# $\LaTeX$ and $\TeX$

Implemented in [$\KaTeX$](https://katex.org/) via [mdbook-katex](https://github.com/lzanini/mdbook-katex).

## Examples
Here is an inline example, $ \pi(\theta) $, 

an equation,

$$ \nabla f(x) \in \mathbb{R}^n, $$

and a regular \$ symbol.

```
c = \pm \sqrt{a^2 + b^2}
```

$$ c = \pm \sqrt{a^2 + b^2} $$

## Macros
```
\f:#1f(#2)
\grad:{\nabla}
\R:{\mathbb{R}^{#1 \times #2}}
```

```
\f\relax{x} = \int_{-\infty}^\infty
    \f\hat\xi\,e^{2 \pi i \xi x}
    \,d\xi
```

$$
\f\relax{x} = \int_{-\infty}^\infty
    \f\hat\xi\,e^{2 \pi i \xi x}
    \,d\xi
$$

$$
\grad f(x) \in \R{n}{p}
$$