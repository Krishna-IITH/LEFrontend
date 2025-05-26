"use client";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, LoaderPinwheel, Loader, LoaderCircle } from "lucide-react";
import { 
  ArrowLeft, 
  ArrowRight,
  ArrowLeft as PrevSlide, 
  ArrowRight as NextSlide,
  Captions, 
  CaptionsOff,
  Fullscreen,
  Minimize
} from "lucide-react";

import LanguageSelector, { INDIAN_LANGUAGES } from "../../_components/LanguageSelector";
import SlideContent from "../../_components/SlideContent";
import TutorialAudio from "../../_components/TutorialAudio";

// JEE Advanced mathematics tutorial on Limits and Continuity
  // const tutorial = {
  //   title: "Limits and Continuity: Essential Concepts for JEE",
  //   subject: "Mathematics",
  //   topic: "Calculus - Limits and Continuity",
  //   slides: [
  //     { 
  //       id: 1, 
  //       // imageUrl: "/lovable-uploads/e16f8762-b917-4476-b969-5c6888160c7d.png",
  //       title: "Introduction to Limits",
  //       content: "Limits are fundamental to calculus and a critical concept in JEE Advanced mathematics. A limit describes the value a function approaches as the input approaches some value.",
  //       audioUrl: "/audio/slide1.mp3",
  //       formulas: [
  //         "lim(x→a) f(x) = L"
  //       ]
  //     },
  //     { 
  //       id: 2, 
  //       // imageUrl: "/lovable-uploads/aae89a4e-f701-430d-827b-8dd055210771.png",
  //       title: "Properties of Limits",
  //       content: "Understanding these properties will help you solve complex limit problems efficiently in your JEE Advanced exam.",
  //       formulas: [
  //         "lim(x→a) [f(x) ± g(x)] = lim(x→a) f(x) ± lim(x→a) g(x)",
  //         "lim(x→a) [f(x) × g(x)] = lim(x→a) f(x) × lim(x→a) g(x)",
  //         "lim(x→a) [f(x) / g(x)] = lim(x→a) f(x) / lim(x→a) g(x), if lim(x→a) g(x) ≠ 0"
  //       ]
  //     },
  //     { 
  //       id: 3,
  //       title: "Evaluating Limits",
  //       content: "When direct substitution leads to indeterminate forms like 0/0 or ∞/∞, we need special techniques to evaluate limits.",
  //       formulas: [
  //         "L'Hôpital's Rule: lim(x→a) [f(x)/g(x)] = lim(x→a) [f'(x)/g'(x)]",
  //         "lim(x→0) (sin x)/x = 1",
  //         "lim(x→0) (1-cos x)/x² = 1/2"
  //       ],
  //       examples: [
  //         {
  //           problem: "Evaluate lim(x→0) (e^x - 1 - x)/x²",
  //           solution: "Use Taylor series expansion of e^x = 1 + x + x²/2 + ... to get lim(x→0) (x²/2 + higher terms)/x² = 1/2"
  //         }
  //       ]
  //     },
  //     {
  //       id: 4,
  //       title: "Continuity of Functions",
  //       content: "A function f is continuous at point 'a' if the following three conditions are satisfied: (1) f(a) is defined, (2) lim(x→a) f(x) exists, and (3) lim(x→a) f(x) = f(a).",
  //       formulas: [
  //         "f is continuous at x = a if lim(x→a) f(x) = f(a)"
  //       ],
  //       examples: [
  //         {
  //           problem: "Is f(x) = |x|/x continuous at x = 0?",
  //           solution: "No, f(0) is undefined as division by zero is undefined. The function is discontinuous at x = 0."
  //         }
  //       ]
  //     },
  //     {
  //       id: 5,
  //       title: "Types of Discontinuities",
  //       content: "Understanding different types of discontinuities is crucial for solving JEE Advanced problems on continuity.",
  //       formulas: [],
  //       examples: [
  //         {
  //           problem: "Find the type of discontinuity in f(x) = (x² - 1)/(x - 1)",
  //           solution: "This has a removable discontinuity at x = 1. We can rewrite as f(x) = x + 1 for x ≠ 1, and then define f(1) = 2 to make it continuous."
  //         }
  //       ]
  //     },
  //     {
  //       id: 6,
  //       title: "Intermediate Value Theorem",
  //       content: "If f is continuous on [a,b] and k is between f(a) and f(b), then there exists at least one c in [a,b] such that f(c) = k. This theorem is often used to prove existence of roots.",
  //       examples: [
  //         {
  //           problem: "Show that the equation x³ + 4x - 10 = 0 has a root between 1 and 2.",
  //           solution: "Let f(x) = x³ + 4x - 10. f(1) = 1 + 4 - 10 = -5 < 0 and f(2) = 8 + 8 - 10 = 6 > 0. Since f is continuous and changes sign, by IVT, there exists c in [1,2] where f(c) = 0."
  //         }
  //       ]
  //     },
  //     {
  //       id: 7,
  //       title: "Practice Problems",
  //       content: "These are typical JEE Advanced level problems on limits and continuity. Try to solve them using the concepts we've covered.",
  //       examples: [
  //         {
  //           problem: "Find lim(x→∞) [x(√(x² + 1) - x)]",
  //           solution: "Multiply numerator and denominator by (√(x² + 1) + x). After simplification, we get lim(x→∞) [x²/(√(x² + 1) + x)] = lim(x→∞) [x/√(1 + 1/x²) + 1] = 1/2"
  //         },
  //         {
  //           problem: "Find all values of k for which f(x) = {kx², if x ≤ 1; 3x + k - 3, if x > 1} is continuous at x = 1.",
  //           solution: "For continuity at x = 1, we need f(1-) = f(1+), which gives k(1)² = 3(1) + k - 3, so k = 3."
  //         }
  //       ]
  //     }
  //   ],
  //   transcriptText: `This tutorial covers Limits and Continuity, essential topics for JEE Advanced Mathematics. 
    
  //   We begin by defining limits as the value a function approaches as the input approaches some value. Understanding this concept is critical for calculus.
    
  //   Next, we explore important properties of limits, including sum, product, and quotient rules. We also discuss special techniques for evaluating limits when direct substitution leads to indeterminate forms.
    
  //   For continuity, we examine the three conditions required for a function to be continuous at a point. We analyze different types of discontinuities, such as removable, jump, and essential discontinuities.
    
  //   The Intermediate Value Theorem is presented as a powerful tool for proving the existence of roots within a given interval.
    
  //   Finally, we work through practice problems typical of JEE Advanced examinations to reinforce these concepts and prepare you for the challenging questions you'll encounter on the exam.`
  // };

const tutorial = {
    title: "Mastering Mean (AM, GM, HM): From Basics to JEE Expertise",
    subject: "Mathematics",
    topic: "Statistics - Measures of Central Tendency (Mean)",
    slides: [
      {
        id: 1,
        title: "Introduction to Mean & Arithmetic Mean (AM) for Ungrouped Data",
        content: "The Mean (or average) is a measure of central tendency representing a 'typical' value. Arithmetic Mean (AM) for ungrouped data is the sum of all observations divided by their count. It's the 'fair share' value or the balance point of the data.",
        audioUrl: "/audio/mean_detailed_slide1.mp3",
        formulas: [
          "For observations x₁, x₂, ..., xₙ: AM (X̄) = (∑xᵢ)/n"
        ],
        examples: [
          {
            problem: "Find the AM of scores: 10, 15, 20, 25, 30.",
            solution: "Sum = 10+15+20+25+30 = 100. Count = 5. AM = 100/5 = 20."
          }
        ]
      },
      {
        id: 2,
        title: "AM for Discrete Frequency Distribution",
        content: "When data values xᵢ repeat with frequencies fᵢ, the AM is calculated by summing the products of each value and its frequency, then dividing by the total frequency (total number of observations).",
        audioUrl: "/audio/mean_detailed_slide2.mp3",
        formulas: [
          "X̄ = (f₁x₁ + f₂x₂ + ... + fₖxₖ)/(f₁ + f₂ + ... + fₖ) = (∑fᵢxᵢ)/(∑fᵢ) = (∑fᵢxᵢ)/N",
          "where N = ∑fᵢ (total frequency)."
        ],
        examples: [
          {
            problem: "Data: xᵢ = [5, 10, 15], fᵢ = [2, 4, 3]. Find AM.",
            solution: "∑fᵢxᵢ = (5×2) + (10×4) + (15×3) = 10 + 40 + 45 = 95. N = 2+4+3=9. AM = 95/9 ≈ 10.56."
          }
        ]
      },
      {
        id: 3,
        title: "AM for Continuous Frequency Distribution (Direct Method)",
        content: "For data in class intervals, we use the mid-point (mᵢ) of each class as the representative value. The AM is then found similarly to the discrete case, using mid-points instead of exact values.",
        audioUrl: "/audio/mean_detailed_slide3.mp3",
        formulas: [
          "Mid-point (mᵢ) = (Lower limit + Upper limit)/2",
          "X̄ = (∑fᵢmᵢ)/(∑fᵢ) = (∑fᵢmᵢ)/N"
        ],
        examples: [
          {
            problem: "Class: [0-10, 10-20], Freq: [5, 10]. Find AM.",
            solution: "m₁ = (0+10)/2 = 5, m₂ = (10+20)/2 = 15. ∑fᵢmᵢ = (5×5) + (10×15) = 25 + 150 = 175. N = 5+10=15. AM = 175/15 ≈ 11.67."
          }
        ]
      },
      {
        id: 4,
        title: "AM - Assumed Mean Method (Shortcut Method)",
        content: "To simplify calculations with large numbers in grouped data, we choose an 'Assumed Mean' (A), find deviations (dᵢ) from it, and apply a correction. This method reduces calculation complexity.",
        audioUrl: "/audio/mean_detailed_slide4.mp3",
        formulas: [
          "dᵢ = mᵢ - A (for continuous) or dᵢ = xᵢ - A (for discrete)",
          "X̄ = A + (∑fᵢdᵢ)/(∑fᵢ) = A + (∑fᵢdᵢ)/N"
        ],
        examples: [
          {
            problem: "Use data from Slide 3: Class: [0-10, 10-20], Freq: [5, 10]. Let Assumed Mean A=5 (m₁).",
            solution: "m₁=5, m₂=15. d₁ = 5-5=0, d₂ = 15-5=10. ∑fᵢdᵢ = (5×0) + (10×10) = 0 + 100 = 100. N=15. X̄ = 5 + 100/15 = 5 + 6.67 ≈ 11.67."
          }
        ]
      },
      {
        id: 5,
        title: "AM - Step-Deviation Method",
        content: "Further simplifies calculations if deviations (dᵢ) have a common factor, h (usually class width). We define uᵢ = dᵢ/h. This method is efficient for uniformly sized class intervals.",
        audioUrl: "/audio/mean_detailed_slide5.mp3",
        formulas: [
          "uᵢ = (mᵢ - A)/h = dᵢ/h",
          "X̄ = A + ((∑fᵢuᵢ)/(∑fᵢ)) × h = A + ((∑fᵢuᵢ)/N) × h"
        ],
        examples: [
          {
            problem: "Use data from Slide 3: Class: [0-10, 10-20], Freq: [5, 10]. A=5, h=10.",
            solution: "m₁=5, m₂=15. u₁ = (5-5)/10 = 0, u₂ = (15-5)/10 = 1. ∑fᵢuᵢ = (5×0) + (10×1) = 10. N=15. X̄ = 5 + (10/15)×10 = 5 + 100/15 ≈ 11.67."
          }
        ]
      },
      {
        id: 6,
        title: "Weighted Arithmetic Mean",
        content: "Used when different data values (xᵢ) have varying importance, represented by 'weights' (wᵢ). Each value is multiplied by its weight before averaging. Similar to AM for discrete data where frequencies act as weights.",
        audioUrl: "/audio/mean_detailed_slide6.mp3",
        formulas: [
          "X̄w = (w₁x₁ + w₂x₂ + ... + wₖxₖ)/(w₁ + w₂ + ... + wₖ) = (∑wᵢxᵢ)/(∑wᵢ)"
        ],
        examples: [
          {
            problem: "Scores: Physics (80, weight 3), Maths (90, weight 2). Find weighted mean.",
            solution: "∑wᵢxᵢ = (80×3) + (90×2) = 240 + 180 = 420. ∑wᵢ = 3+2 = 5. X̄w = 420/5 = 84."
          }
        ]
      },
      {
        id: 7,
        title: "Combined Arithmetic Mean",
        content: "Calculates the mean of a composite group formed by merging sub-groups with known means (X̄ᵢ) and sizes (nᵢ). The total sum of the combined group is the sum of totals from sub-groups.",
        audioUrl: "/audio/mean_detailed_slide7.mp3",
        formulas: [
          "For two groups: X̄₁₂ = (n₁X̄₁ + n₂X̄₂)/(n₁ + n₂)",
          "For k groups: X̄comb = (∑nᵢX̄ᵢ)/(∑nᵢ)"
        ],
        examples: [
          {
            problem: "30 boys avg score 70; 20 girls avg score 80. Find combined avg.",
            solution: "X̄comb = ((30×70) + (20×80))/(30+20) = (2100 + 1600)/50 = 3700/50 = 74."
          }
        ]
      },
      {
        id: 8,
        title: "Properties of AM - Part 1",
        content: "Understanding AM properties is crucial for quick JEE problem-solving. 1. Sum of deviations from mean is zero: Mean acts as a balance point. 2. Change of Origin: If a constant is added/subtracted from all values, the mean changes by the same constant.",
        audioUrl: "/audio/mean_detailed_slide8.mp3",
        formulas: [
          "1. ∑(xᵢ - X̄) = 0 or ∑fᵢ(xᵢ - X̄) = 0",
          "2. If yᵢ = xᵢ ± k, then Ȳ = X̄ ± k."
        ],
        examples: [
          {
            problem: "Mean of 5 numbers is 10. If 3 is added to each number, what is the new mean?",
            solution: "New mean Ȳ = X̄ + 3 = 10 + 3 = 13."
          }
        ]
      },
      {
        id: 9,
        title: "Properties of AM - Part 2",
        content: "3. Change of Scale: If all values are multiplied/divided by a non-zero constant, the mean scales by the same factor. 4. Linear Transformation: Combines change of origin and scale. This is a very powerful property for JEE.",
        audioUrl: "/audio/mean_detailed_slide9.mp3",
        formulas: [
          "3. If yᵢ = kxᵢ, then Ȳ = kX̄. If yᵢ = xᵢ/k, then Ȳ = X̄/k.",
          "4. If yᵢ = axᵢ + b, then Ȳ = aX̄ + b."
        ],
        examples: [
          {
            problem: "Mean of observations is 25. If each observation is multiplied by 2 and then 5 is added, find the new mean.",
            solution: "Here a=2, b=5. Original mean X̄=25. New mean Ȳ = 2X̄ + 5 = 2(25) + 5 = 50+5 = 55."
          }
        ]
      },
      {
        id: 10,
        title: "Properties of AM - Part 3 (Sum of Squared Deviations)",
        content: "5. The sum of squared deviations of observations from any value 'k', i.e., ∑(xᵢ - k)² (or ∑fᵢ(xᵢ-k)² for grouped data), is minimum when k = X̄. This property forms the basis for variance.",
        audioUrl: "/audio/mean_detailed_slide10.mp3",
        formulas: [
          "∑(xᵢ - k)² is minimum when k = X̄."
        ],
        examples: [
          {
            problem: "For the numbers 2, 4, 6, the sum of squared deviations (2-k)² + (4-k)² + (6-k)² is minimum when k is?",
            solution: "The sum is minimum when k is the AM. AM = (2+4+6)/3 = 12/3 = 4. So, k=4."
          }
        ]
      },
      {
        id: 11,
        title: "Geometric Mean (GM) - Definition & Ungrouped Data",
        content: "Geometric Mean (GM) is used for averaging quantities that change multiplicatively (e.g., rates of change, ratios, growth factors). It's defined for positive observations only. Logarithm of GM is the AM of logarithms of observations.",
        audioUrl: "/audio/mean_detailed_slide11.mp3",
        formulas: [
          "For n positive observations x₁, ..., xₙ: G = (x₁ · x₂ · ... · xₙ)^(1/n)",
          "log G = (1/n) ∑ log xᵢ"
        ],
        examples: [
          {
            problem: "Find the GM of 2, 4, 8.",
            solution: "G = (2 × 4 × 8)^(1/3) = (64)^(1/3) = 4."
          }
        ]
      },
      {
        id: 12,
        title: "Geometric Mean (GM) - Grouped Data & Applications",
        content: "For grouped data with frequencies fᵢ, GM incorporates these frequencies as powers. GM is applied to average percentage increases, find average growth rates, or deal with index numbers.",
        audioUrl: "/audio/mean_detailed_slide12.mp3",
        formulas: [
          "For grouped data (xᵢ with freq fᵢ, N=∑fᵢ): G = (x₁^f₁ · x₂^f₂ · ... · xₖ^fₖ)^(1/N)",
          "log G = (1/N) ∑ (fᵢ log xᵢ)"
        ],
        examples: [
          {
            problem: "A value doubles in year 1 (factor 2) and triples in year 2 (factor 3). Find the average annual growth factor.",
            solution: "Average growth factor G = (2 × 3)^(1/2) = √6 ≈ 2.449."
          }
        ]
      },
      {
        id: 13,
        title: "Harmonic Mean (HM) - Definition & Ungrouped Data",
        content: "Harmonic Mean (HM) is used for averaging rates where the numerator is constant (e.g., average speed for equal distances). Defined for non-zero observations. It's the reciprocal of the AM of reciprocals.",
        audioUrl: "/audio/mean_detailed_slide13.mp3",
        formulas: [
          "For n non-zero observations x₁, ..., xₙ: H = n/(1/x₁ + 1/x₂ + ... + 1/xₙ) = n/∑(1/xᵢ)"
        ],
        examples: [
          {
            problem: "Find the HM of 1, 2, 4.",
            solution: "H = 3/(1/1 + 1/2 + 1/4) = 3/(1 + 0.5 + 0.25) = 3/1.75 = 3/(7/4) = 12/7 ≈ 1.714."
          }
        ]
      },
      {
        id: 14,
        title: "Harmonic Mean (HM) - Grouped Data & Applications (Avg. Speed)",
        content: "For grouped data, HM incorporates frequencies. A classic application is finding average speed when a journey is covered in segments of equal distance but at different speeds.",
        audioUrl: "/audio/mean_detailed_slide14.mp3",
        formulas: [
          "For grouped data (xᵢ with freq fᵢ, N=∑fᵢ): H = N/∑(fᵢ/xᵢ)"
        ],
        examples: [
          {
            problem: "A car travels from A to B at 40 km/h and returns (same distance) at 60 km/h. Find average speed.",
            solution: "Average speed = HM of 40 and 60. H = 2/(1/40 + 1/60) = 2/((3+2)/120) = 2×120/5 = 48 km/h."
          }
        ]
      },
      {
        id: 15,
        title: "Relationship between AM, GM, HM",
        content: "For any set of positive observations, AM ≥ GM ≥ HM. Equality holds if and only if all observations are equal. For two positive numbers a, b, it's also true that GM² = AM · HM. This is a key relationship for inequalities.",
        audioUrl: "/audio/mean_detailed_slide15.mp3",
        formulas: [
          "AM ≥ GM ≥ HM",
          "For two positive numbers a, b: GM² = AM · HM"
        ],
        examples: [
          {
            problem: "AM of two positive numbers is 15 and their GM is 9. Find their HM.",
            solution: "Using GM² = AM · HM ⇒ 9² = 15 · HM ⇒ 81 = 15 · HM ⇒ HM = 81/15 = 5.4."
          }
        ]
      },
      {
        id: 16,
        title: "JEE Problem Solving: Incorrect Observation",
        content: "A common JEE problem type involves correcting the mean after discovering errors in observations. The strategy is to find the incorrect sum, adjust it by subtracting wrong values and adding correct ones, then recalculate mean.",
        audioUrl: "/audio/mean_detailed_slide16.mp3",
        formulas: [
          "Correct Sum = Incorrect Sum - (Sum of Wrong Observations) + (Sum of Correct Observations)",
          "Correct Mean = Correct Sum / Number of Observations"
        ],
        examples: [
          {
            problem: "Mean of 100 items was 50. Later, items 92 and 8 were found to be misread for 192 and 88. Find correct mean.",
            solution: "Incorrect Sum = 100 × 50 = 5000. Wrong Sum = 92+8=100. Correct Sum = 192+88=280. Correct Total Sum = 5000 - 100 + 280 = 5180. Correct Mean = 5180/100 = 51.8."
          }
        ]
      },
      {
        id: 17,
        title: "JEE Example: Combined Mean with Percentages",
        content: "Problems may require finding proportions or percentages of sub-groups when the combined mean and sub-group means are known. Set up the combined mean equation and solve for the ratio of group sizes.",
        audioUrl: "/audio/mean_detailed_slide17.mp3",
        formulas: [
          "X̄comb = (nmX̄m + nwX̄w)/(nm + nw)"
        ],
        examples: [
          {
            problem: "Mean age of men & women is 35. Mean age of men = 40, women = 32. Find % of men.",
            solution: "35 = (nm(40) + nw(32))/(nm + nw) ⇒ 35nm + 35nw = 40nm + 32nw ⇒ 3nw = 5nm ⇒ nm/nw = 3/5. Total parts = 8. % Men = (3/8) × 100 = 37.5%."
          }
        ]
      },
      {
        id: 18,
        title: "JEE Example: AM-GM-HM Inequality Application",
        content: "The AM-GM-HM inequality is often used to prove inequalities or find minimum/maximum values of expressions, especially in algebra and calculus contexts integrated with statistics.",
        audioUrl: "/audio/mean_detailed_slide18.mp3",
        formulas: [
          "For positive a,b,c: (a+b+c)(1/a+1/b+1/c) ≥ 9"
        ],
        examples: [
          {
            problem: "Prove that for positive a,b,c: (a+b+c)(1/a+1/b+1/c) ≥ 9.",
            solution: "We know AM ≥ HM. For numbers a,b,c: (a+b+c)/3 ≥ 3/(1/a+1/b+1/c). Rearranging gives (a+b+c)(1/a+1/b+1/c) ≥ 9."
          }
        ]
      },
      {
        id: 19,
        title: "Common Mistakes & JEE Tips for Mean",
        content: "Avoid choosing the wrong type of mean (AM/GM/HM). Double-check calculations, especially for grouped data. Master properties of AM for shortcuts. Understand AM-GM-HM inequality. Practice diverse JEE problems.",
        audioUrl: "/audio/mean_detailed_slide19.mp3",
        formulas: [],
        examples: [
          {
            problem: "Tip: For average speed with equal distances, always use HM.",
            solution: "E.g., Speed 1 (s₁), Speed 2 (s₂). Avg Speed = 2s₁s₂/(s₁+s₂)."
          },
          {
            problem: "Tip: For percentage growth rates over periods, use GM of growth factors.",
            solution: "Growth factors: 1+r₁/100, 1+r₂/100, ..."
          }
        ]
      }
    ],
    // transcriptText: "This comprehensive tutorial guides you from the fundamentals of Mean to advanced applications for JEE. We begin with Arithmetic Mean (AM) for ungrouped and various types of grouped data, including direct, assumed mean, and step-deviation methods. Weighted and Combined AM concepts critical for specific problem types are thoroughly explained.\n\nA significant portion is dedicated to the powerful Properties of Arithmetic Mean, which are essential for efficient problem-solving in JEE, covering change of origin, scale, and linear transformations. We also discuss the sum of squared deviations property.\n\nThe tutorial then delves into Geometric Mean (GM) and Harmonic Mean (HM), detailing their definitions, calculations for ungrouped and grouped data, and specific applications such as averaging growth rates (GM) or speeds over equal distances (HM).\n\nThe crucial relationship AM ≥ GM ≥ HM and its implications, especially GM² = AM·HM for two numbers, are highlighted with examples. \n\nWe then focus on JEE-specific problem-solving strategies, illustrated with worked-out examples typical of JEE patterns, such as correcting means due to misread observations, combined mean problems involving percentages, and applications of the AM-GM-HM inequality.\n\nFinally, common pitfalls are discussed along with tips to avoid them, ensuring you are well-prepared to tackle questions on Mean with accuracy and confidence in your JEE exams."
  // "transcriptText": "   Hello everyone! Today, weʼre going to explore three important types of averages: Arithmetic Mean, Geometric Mean, and Harmonic Mean. These are powerful tools for understanding data and solving a wide variety of problems, especially in exams like the JEE. \nLetʼs start with the Arithmetic Mean, or AM. The mean is a measure of central tendency, which simply means it tells us what a “typical” value in a dataset looks like. The Arithmetic Mean for ungrouped data is the sum of all observations divided by how many there are. Itʼs the “fair share” value or the balance point of the data.\nFor example, if your scores are 10, 15, 20, 25, and 30, you add them all up to get 100, and then divide by 5. So, the arithmetic mean is 100 divided by 5, which equals 20.\nSometimes, numbers repeat in our data. For example, if a score of 10 appears three times, we say its frequency is 3. To find the mean in this case, we multiply each value by its frequency, add them all up, and divide by the total number of observations. For example, if your data is 5, 10, 15 with frequencies 2, 4, 3, you calculate (5×2) + (10×4) + (15×3) = 10 + 40 + 45 = 95. The total frequency is 2 + 4 + 3 = 9. So, the mean is 95 divided by 9, which is about 10.56.\nWhen data comes in groups or intervals, like ages 0–10, 10–20, and so on, we use the midpoint of each group as its value. Multiply each midpoint by its frequency, add them up, and divide by the total frequency to get the mean. For example, for classes 0–10 and 10–20 with frequencies 5 and 10, the midpoints are 5 and 15. So, (5×5) + (10×15) = 25 + 150 = 175. The total frequency is 15. The mean is 175 divided by 15, which is about 11.67.\nDealing with large numbers? Use the assumed mean method! Pick a value close to your data as the “assumed mean,” find how far each value is from it, and use those differences to make calculations easier. For example, if you use 5 as the assumed mean, the deviations for 5 and 15 are 0 and 10. Multiply each deviation by its frequency, add them, and divide by the total frequency. Then add this correction to your assumed mean.\nIf your data groups are evenly spaced, you can make things even simpler. Calculate the difference from the assumed mean, divide by the class width, and work with these smaller numbers. This step-deviation method is a real time-saver!\nNot all numbers are equally important. Sometimes, we give more “weight” to certain values. Multiply each value by its weight, add them up, and divide by the total weight. For example, if Physics has a score of 80 with weight 3, and Maths has 90 with weight 2, the weighted mean is (80×3 + 90×2) divided by (3+2), which is 420 divided by 5, or 84.\nWhat if you have two groups, like boys and girls, with their own averages? To find the overall mean, multiply each groupʼs mean by its size, add them, and divide by the total number of students. For example, if 30 boys average 70 and 20 girls average 80, the combined mean is (30×70 + 20×80) divided by 50, which is 74.\nThe mean has some very useful properties. First, the mean is a balance point: the sum of the differences from the mean is always zero. If you add or subtract the same number to every value, the mean changes by that amount. If you multiply every value by a constant, the mean also gets multiplied by that constant. And if you use both multiplication and addition, the mean transforms in the same way. This is called a linear transformation.\nHereʼs a cool fact: if you want to minimize the sum of the squared differences from a number, the mean is the best choice. This property is the foundation for variance and standard deviation in statistics.\nNow, letʼs talk about the Geometric Mean, or GM. This mean is used when numbers multiply, like in growth rates or percentages. Multiply all the values together, then take the nth root, where n is the number of values. For example, the GM of 2, 4, and 8 is (2×4×8) to the power of 1/3, which is the cube root of 64, or 4. GM is only for positive numbers.\nFor grouped data, raise each value to the power of its frequency, multiply, and take the nth root. GM is perfect for average growth rates, percentage increases, and index numbers. For example, if a value doubles in year 1 and triples in year 2, the average growth factor is the square root of (2×3), which is about 2.45.\nThe Harmonic Mean, or HM, is used for averaging rates, like speed. Take the reciprocal of each value, find their average, and then take the reciprocal again. For example, the HM of 1, 2, and 4 is 3 divided by (1/1 + 1/2 + 1/4), which is 3 divided by 1.75, or about 1.71. HM is always the lowest of the three means.\nFor grouped data, HM uses frequencies just like the other means. A classic application is finding average speed when a journey is covered in segments of equal distance but at different speeds. For example, if you travel from A to B at 40 km/h and return at 60 km/h, the average speed is not 50! Use HM: 2 divided by (1/40 + 1/60), which equals 48 km/h.\nHereʼs a key relationship: For any set of positive numbers, AM is always greater than or equal to GM, and GM is greater than or equal to HM. In symbols, AM ≥ GM ≥ HM. For two numbers, the product of AM and HM equals the square of GM.\nIn exams, you might find a mistake in your data. Donʼt worry! Just subtract the wrong value, add the correct one, and recalculate the mean. For example, if the mean of 100 items was 50, but two values were misread as 92 and 8 instead of 192 and 88, recalculate by adjusting the total sum and dividing by 100.\nSometimes, you need to find the percentage of a group given combined means. Set up an equation using the combined mean formula, plug in the numbers, and solve for the unknown percentage. For example, if the mean age of men and women is 35, menʼs mean is 40, and womenʼs is 32, you can find the percentage of men using the combined mean formula.\nThe AM-GM-HM inequality is a powerful tool for proving inequalities or finding minimum and maximum values in algebra and calculus. For example, for positive a, b, and c, (a + b + c)(1/a + 1/b + 1/c) is always at least 9.\nFinally, avoid common mistakes: use the right mean for the right situation, double-check your calculations, and remember the properties and relationships we discussed. Practice different types of problems, and youʼll be ready for any question on means!\nGreat job, everyone! With these tools—AM, GM, and HM—you can handle any average you meet in math, science, or exams. Keep practicing, and youʼll master these concepts in no time!"
"transcriptText": "Hi everyone! Today, we’ll explore three types of averages: Arithmetic Mean (AM), Geometric Mean (GM), and Harmonic Mean (HM). These help us understand and solve many math problems.\n\n**1. Arithmetic Mean (AM):** Add all numbers and divide by how many there are. Example: (10 + 15 + 20 + 25 + 30) / 5 = 20.\n- With frequencies: Multiply each value by its frequency, add, then divide by total frequency. Example: (5×2 + 10×4 + 15×3)/9 = 95/9 ≈ 10.56.\n- Grouped data: Use midpoints. Example: For 0–10 (5) and 10–20 (15), with frequencies 5 and 10: (5×5 + 15×10)/15 = 175/15 ≈ 11.67.\n- Assumed mean: Pick a value near the data to simplify. Use deviations, then adjust the assumed mean.\n- Weighted mean: Multiply values by weights, divide by total weight. Example: (80×3 + 90×2)/(3+2) = 84.\n- Combined mean: Use when combining groups. Example: (30×70 + 20×80)/50 = 74.\n\n**Properties of AM:**\n- It’s the balance point: deviations from mean sum to 0.\n- Adding/multiplying all values affects the mean in the same way.\n- Minimizes squared differences – used in variance and standard deviation.\n\n**2. Geometric Mean (GM):** Used for multiplying values, like growth rates.\n- Multiply values, take the nth root. Example: GM of 2, 4, 8 = (2×4×8)^(1/3) = 4.\n- Only for positive numbers.\n- For grouped data, raise each value to its frequency, multiply, then root.\n\n**3. Harmonic Mean (HM):** Used for rates like speed.\n- Take reciprocal of each value, find average, then take reciprocal. Example: HM of 1, 2, 4 = 3 / (1 + 0.5 + 0.25) = 1.71.\n- For average speed: HM = 2 / (1/40 + 1/60) = 48 km/h.\n\n**Key Inequality:** For positive numbers: AM ≥ GM ≥ HM. For two numbers: AM × HM = GM².\n\n**Other Tips:**\n- Fixing errors: If wrong value found, subtract it and add the correct one to update the mean.\n- Finding group percentages: Use combined mean formula.\n\n**Common Mistakes to Avoid:**\n- Use the right mean for the problem.\n- Double-check your work.\n- Remember relationships like AM ≥ GM ≥ HM.\n\nGreat work! Keep practicing AM, GM, and HM to master averages!"
  
};

const TutorialView = () => {
  const { id = "1", tutorialId = "0" } = useParams();
  const { toast } = useToast();
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [notes, setNotes] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES[0].code);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [sourceText, setSourceText] = useState(tutorial.transcriptText);
  const [translatedText, setTranslatedText] = useState(tutorial.transcriptText);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [text, setText] = useState(translatedText);
  const [blobloading, setBlobLoading] = useState(false);
  // const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const words = text.split(" ");
  

  const handlePlay = () => {
    if (!audioUrl || !audioRef.current) return;
    setCurrentWordIndex(0);
    audioRef.current.play();

    // Simulate word-by-word caption reading
    const wordDuration = 600; // milliseconds per word (adjust as needed)
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index >= words.length) {
        clearInterval(interval);
        setCurrentWordIndex(-1);
      } else {
        setCurrentWordIndex(index);
      }
    }, wordDuration);

    audioRef.current.onended = () => {
      clearInterval(interval);
      setCurrentWordIndex(-1);
    };
         const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle fullscreen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-advance slides when playing
  useEffect(() => {
    let slideTimer: number;

    if (isPlaying && autoAdvance) {
      slideTimer = window.setTimeout(() => {
        if (currentSlideIndex < tutorial.slides.length - 1) {
          setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 15000); // Advance slide every 15 seconds - in a real app, this would be synchronized with audio duration
    }

    return () => {
      if (slideTimer) window.clearTimeout(slideTimer);
    };
  }, [isPlaying, currentSlideIndex, autoAdvance, tutorial.slides.length]);

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen Error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive"
        });
      });
    } else {
      document.exitFullscreen();
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < tutorial.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      if (isPlaying) {
        // Briefly pause to reset audio for new slide
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 50);
      }
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      if (isPlaying) {
        // Briefly pause to reset audio for new slide
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 50);
      }
    }
  };

  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    if (autoAdvance && currentSlideIndex < tutorial.slides.length - 1) {
      goToNextSlide();
    } else {
      setIsPlaying(false);
    }
  };

  // const handleLanguageChange = (languageCode: string) => {
  //   setSelectedLanguage(languageCode);
  //   setSourceText(tutorial.transcriptText);
  //   toast({
  //     title: "Language Changed",
  //     description: `Audio language switched to ${INDIAN_LANGUAGES.find(l => l.code === languageCode)?.name}`,
  //   });
  // };

const stopAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const playAudio = () => {
    audioRef.current?.play();
  };
const generateAudio = async (textToConvert: string) => {
    if (!textToConvert.trim()) return;
    setBlobLoading(true);
    toast({
    title: "Audio is processing, please wait!",
    description: "Your audio is processing.",
  });
    try {
      const response = await fetch("https://anuvaad-backend.bhashini.co.in/v1/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pipelineTasks: [
            {
              taskType: "tts",
              config: {
                language: { sourceLanguage: "hi" },
                serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
                gender: "female"
              }
            }
          ],
          inputData: {
            input: [{ source: textToConvert }],
            audio: [{ audioContent: "" }]
          }
        })
      });

      const data = await response.json();
      const base64Audio = data?.pipelineResponse?.[0]?.audio?.[0]?.audioContent;
      if (!base64Audio) throw new Error("No audio returned");

      const byteCharacters = atob(base64Audio);
      const byteArray = new Uint8Array(Array.from(byteCharacters, c => c.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);

      console.log(url);
      setAudioUrl(url);
      if (audioRef.current) audioRef.current.src = url;
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setLoading(false);
      setBlobLoading(false);
      toast({
      title: "Audio Ready",
      description: "Your audio has been successfully generated.",
    });
    }
  };

  // useEffect(() => {
  //   if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
  //   debounceTimeout.current = setTimeout(() => generateAudio(translatedText), 1000);
  //   return () => debounceTimeout.current && clearTimeout(debounceTimeout.current);
  // }, [text]);

useEffect(() => {
  if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
  }

  debounceTimeout.current = setTimeout(() => {
    generateAudio(text);
  }, 1000);

  return () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };
}, [text]);


  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    stopAudio()
    // Extract just "hi" from "hi-IN"
    const targetLangCode = language.split("-")[0];

    const response = await fetch("https://anuvaad-backend.bhashini.co.in/v1/pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: {
                sourceLanguage: "en",
                targetLanguage: targetLangCode
              },
              serviceId: "ai4bharat/indictrans-v2-all-gpu--t4"
            }
          }
        ],
        inputData: {
          input: [{ source: tutorial.transcriptText }],
          audio: []
        }
      })
    });

    const data = await response.json();
    const result = data?.pipelineResponse?.[0]?.output?.[0]?.target || "Translation failed";
    console.log(result)
    await setTranslatedText(result);
    console.log(translatedText)
    await generateAudio(result);
  };


  const saveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    });
  };

  return (
    <div className=" bg-gray-50 flex flex-col">
      {/* <header className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center">
        <Link to="/" className="text-purple-600 text-xl font-medium">LEARNEASY</Link>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/lovable-uploads/ada64135-20fe-42e8-aec2-809a83c93e36.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </header> */}

      <div className="container mx-auto">
        {/* <div className="flex justify-between items-center mb-0">
          <div>
            <Link to={`/course/${id}`} className="text-purple-600 hover:underline flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Course
            </Link>
            <h1 className="text-2xl font-bold mt-2">{tutorial.title}</h1>
            <p className="text-gray-600">{tutorial.subject} - {tutorial.topic}</p>
          </div>
        </div> */}

        {/* Fixed-size video player container */}
        <div className="mx-auto w-full">
          <div 
            className="border-0 shadow-lg overflow-hidden"
            // style={{ height: "680px", maxHeight: "calc(100vh - 220px)" }}
            style={{ 
      height: isFullscreen ? "100vh" : "720px",
      maxHeight: isFullscreen ? "none" : "calc(100vh - 160px)"
    }}
            ref={playerRef}
          >
            <div className="relative h-full">
              <div className="w-full h-full relative">
                {tutorial.slides.map((slide, index) => (
                  <SlideContent
                    key={slide.id}
                    slide={slide}
                    isActive={currentSlideIndex === index}
                    language={selectedLanguage}
                  />
                ))}
                
                {showCaptions && (
                  <div className="absolute bottom-16 left-0 right-0 bg-black bg-opacity-75 text-white py-3 px-6 mx-auto max-w-3xl rounded-lg">
                    <p className="text-center">{tutorial.slides[currentSlideIndex].content}</p>
                  </div>
                )}
              </div>
            </div>
            
            <CardContent className="border-t border-gray-200 bg-white p-2 absolute bottom-0 left-0 right-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 min-w-[40px]">
                  {currentSlideIndex + 1}/{tutorial.slides.length}
                </span>
                <div className="flex-1">
                  <Progress value={((currentSlideIndex + 1) / tutorial.slides.length) * 100} className="h-2" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {/* <TutorialAudio
                    audioUrl={audioUrl}
                    isPlaying={isPlaying}
                    onPlayPause={togglePlayPause}
                    onEnded={handleAudioEnded}
                    language={selectedLanguage}
                    text={translatedText}
                  /> */}
                  {/* <button
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          onClick={handlePlay}
          disabled={!audioUrl || loading}
        >
          {loading ? "Loading..." : "Play"}
        </button> */}
        {blobloading? "Audio Loading! Please Wait...":  <Button 
        variant="outline" 
        size="icon"
        onClick={() => {
          togglePlayPause();
          handlePlay();
        }}
        onEnded={handleAudioEnded}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="hover:bg-purple-100"
      disabled={blobloading}> 
      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>}
         <audio ref={audioRef} controls className="mt-4 w-full" />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={goToPreviousSlide}
                    disabled={currentSlideIndex === 0}
                    className="hover:bg-purple-100"
                  >
                    <PrevSlide className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={goToNextSlide}
                    disabled={currentSlideIndex === tutorial.slides.length - 1}
                    className="hover:bg-purple-100"
                  >
                    <NextSlide className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={toggleCaptions}
                    aria-label={showCaptions ? "Hide captions" : "Show captions"}
                    className={showCaptions ? "bg-purple-100" : "hover:bg-purple-100"}
                  >
                    {showCaptions ? <CaptionsOff className="h-4 w-4" /> : <Captions className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    className="hover:bg-purple-100"
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Fullscreen className="h-4 w-4" />}
                  </Button>
                  <div className="flex items-center ml-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAutoAdvance(!autoAdvance)}
                      className={`text-xs ${autoAdvance ? "bg-purple-100" : ""}`}
                    >
                      {autoAdvance ? "Auto-advance ON" : "Auto-advance OFF"}
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <span className="mr-2">Transcript</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Slides Transcript</SheetTitle>
                </SheetHeader>
                <div className="mt-6 text-gray-700">
                  <p className="mb-4 whitespace-pre-line">{translatedText}</p>
                </div>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <span className="mr-2">Notes</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Notes</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Textarea 
                    className="min-h-[300px]" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes here..."
                  />
                  <Button 
                    className="mt-4 bg-purple-600 hover:bg-purple-700 w-full" 
                    onClick={saveNotes}
                  >
                    Save Notes
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

                <LanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialView;