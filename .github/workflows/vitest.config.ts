export default function defineConfig() {
    return {
        test: {
            include: ['./test/platform/**/*.test.ts'],
            threads: true,
            isolate: false,
            maxConcurrency: 20,
            fileParallelism: true,
        },
    };
}
