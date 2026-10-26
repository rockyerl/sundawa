import type { Tech, TechCategory } from './tech'

const svg = (color: string, body: string) => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${body}</svg>`

const hardhat = `<svg viewBox="0 0 24 24" fill="#FFF100" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C8 1 4.5 4 4.5 8v.5C3 9 2 10.1 2 11.5V13h20v-1.5C22 10.1 21 9 19.5 8.5V8C19.5 4 16 1 12 1zm0 2c3 0 5.5 2.2 5.5 5H6.5C6.5 5.2 9 3 12 3zM2 14v1c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1H2z"/></svg>`
const openZeppelin = `<svg viewBox="0 0 24 24" fill="#4E5EE4" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7v5c0 5.25 4.25 10.15 10 11.35C17.75 22.15 22 17.25 22 12V7L12 2zm0 2.18l8 4.07V12c0 4.34-3.46 8.48-8 9.71C7.46 20.48 4 16.34 4 12V8.25l8-4.07zM11 7v6l5.25 3.15.75-1.23-4.5-2.67V7H11z"/></svg>`

export const techs: Tech[] = [
    { name: 'Laravel', color: '#FF2D20', category: 'Backend', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
    { name: 'Node.js', color: '#539E43', category: 'Backend', icon: 'https://cdn.simpleicons.org/nodedotjs/539E43' },
    { name: 'Go', color: '#00ADD8', category: 'Backend', icon: 'https://cdn.simpleicons.org/go/00ADD8' },
    { name: '.NET', color: '#512BD4', category: 'Backend', icon: 'https://cdn.simpleicons.org/dotnet/512BD4' },
    { name: 'Flutter', color: '#54C5F8', category: 'Mobile', icon: 'https://cdn.simpleicons.org/flutter/54C5F8' },
    { name: 'Kotlin', color: '#7F52FF', category: 'Mobile', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF' },
    { name: 'Next.js', color: '#F8F8F8', category: 'Frontend', icon: 'https://cdn.simpleicons.org/nextdotjs/F8F8F8' },
    { name: 'React', color: '#61DAFB', category: 'Frontend', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'TypeScript', color: '#3178C6', category: 'Frontend', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'MySQL', color: '#4479A1', category: 'Database', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
    { name: 'PostgreSQL', color: '#336791', category: 'Database', icon: 'https://cdn.simpleicons.org/postgresql/336791' },
    { name: 'Redis', color: '#DC382D', category: 'Database', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
    { name: 'Docker', color: '#2496ED', category: 'DevOps', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'NGINX', color: '#009639', category: 'DevOps', icon: 'https://cdn.simpleicons.org/nginx/009639' },
    { name: 'GitHub Actions', color: '#2088FF', category: 'DevOps', icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
    { name: 'Solidity', color: '#A0A0A0', category: 'Web3', icon: 'https://cdn.simpleicons.org/solidity/A0A0A0' },
    { name: 'Ethereum', color: '#627EEA', category: 'Web3', icon: 'https://cdn.simpleicons.org/ethereum/627EEA' },
    { name: 'Web3.js', color: '#F16822', category: 'Web3', icon: 'https://cdn.simpleicons.org/web3dotjs/F16822' },
    { name: 'Hardhat', color: '#FFF100', category: 'Web3', svgIcon: hardhat },
    { name: 'OpenZeppelin', color: '#4E5EE4', category: 'Web3', svgIcon: openZeppelin },
]

export const categories: TechCategory[] = [
    { name: 'Backend', color: '#FF2D20', count: 4, svgIcon: svg('#FF2D20', '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/>') },
    { name: 'Mobile', color: '#54C5F8', count: 2, svgIcon: svg('#54C5F8', '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>') },
    { name: 'Frontend', color: '#61DAFB', count: 3, svgIcon: svg('#61DAFB', '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/>') },
    { name: 'Database', color: '#4479A1', count: 3, svgIcon: svg('#4479A1', '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/>') },
    { name: 'DevOps', color: '#009639', count: 3, svgIcon: svg('#009639', '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>') },
    { name: 'Web3', color: '#627EEA', count: 5, icon: 'https://cdn.simpleicons.org/ethereum/627EEA' },
]
