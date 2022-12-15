fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let mut overlapping_ranges = 0;
    for line in input.split('\n') {
        let mut ranges = Vec::new();
        for range in line.split(',') {
            let mut range = range.split('-');
            let start = range.next().unwrap().parse::<u32>().unwrap();
            let end = range.next().unwrap().parse::<u32>().unwrap();
            ranges.push((start, end));
        }
        if (ranges[0].0 <= ranges[1].0 && ranges[0].1 >= ranges[1].1) || (ranges[0].0 >= ranges[1].0 && ranges[0].1 <= ranges[1].1) {
            overlapping_ranges += 1;
        }
    }

    println!("Overlapping range: {}", overlapping_ranges);
}
