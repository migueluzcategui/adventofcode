// Portable SIMD API is enabled by "simd" feature.
#![cfg_attr(feature = "simd", allow(unstable_features), feature(portable_simd))]

pub mod utils;

#[doc = concat!("# ", "2024 Advent of Code solutions.")]
pub mod year2024 {
    pub mod day01;
}
