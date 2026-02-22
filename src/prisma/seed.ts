import { PrismaClient, AlbumType } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// 2. Pass the adapter to the constructor
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Clean up existing data (optional, careful in production)
  await prisma.$transaction([
    prisma.favorite.deleteMany(),
    prisma.playlistNightcore.deleteMany(),
    prisma.playlist.deleteMany(),
    prisma.follow.deleteMany(),
    prisma.user.deleteMany(),
    prisma.nightcore.deleteMany(),
    prisma.uploader.deleteMany(),
    prisma.song.deleteMany(),
    prisma.artist.deleteMany(),
    prisma.album.deleteMany(),
  ]);

  // --- Artists ---
  const artistPitbull = await prisma.artist.create({
    data: {
      id: '0TnOYISbd1XYRBk9myaseg',
      name: 'Pitbull',
      images: [
        {
          url: 'https://i.scdn.co/image/ab6761610000e5eb1d2c2b9b5d4c1b3f9e8a7d6c',
          height: 640,
          width: 640,
        },
      ],
    },
  });

  const artistKesha = await prisma.artist.create({
    data: {
      id: '6LqNN22kTzi4OA6nbV2tIE',
      name: 'Kesha',
      images: [
        {
          url: 'https://i.scdn.co/image/ab6761610000e5eb8e5f8d9c7b6a5d4c3b2a1f0e',
          height: 640,
          width: 640,
        },
      ],
    },
  });

  const artistGaga = await prisma.artist.create({
    data: {
      id: '1HY2Jd0NmPuamShAr6KMms',
      name: 'Lady Gaga',
      images: [
        {
          url: 'https://i.scdn.co/image/ab6761610000e5eb9c8b7a6d5e4f3c2b1a0d9e8f',
          height: 640,
          width: 640,
        },
      ],
    },
  });

  // --- Albums ---
  const albumGlobalization = await prisma.album.create({
    data: {
      id: '4c1q2w3e4r5t6y7u8i9o0p1q',
      title: 'Globalization',
      album_type: AlbumType.album,
      total_tracks: 12,
      release_date: new Date('2014-11-24'),
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b1c2d3e4f5g6h7i8j9k0l1m2n3o4',
          height: 640,
          width: 640,
        },
      ],
      label: 'RCA Records',
      upc: '886445678912',
      artists: { connect: [{ id: artistPitbull.id }] },
    },
  });

  const albumWarrior = await prisma.album.create({
    data: {
      id: '5a6b7c8d9e0f1g2h3i4j5k6l7m',
      title: 'Warrior',
      album_type: AlbumType.album,
      total_tracks: 14,
      release_date: new Date('2012-11-30'),
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b1c8d9e0f1a2b3c4d5e6f7g8h9i0',
          height: 640,
          width: 640,
        },
      ],
      label: 'Kemosabe Records',
      upc: '887254789123',
      artists: { connect: [{ id: artistKesha.id }] },
    },
  });

  const albumChromatica = await prisma.album.create({
    data: {
      id: '2n3u1z3w4e5r6t7y8u9i0o1p2q',
      title: 'Chromatica',
      album_type: AlbumType.album,
      total_tracks: 16,
      release_date: new Date('2020-05-29'),
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b1c4d5e6f7g8h9i0j1k2l3m4n5o6',
          height: 640,
          width: 640,
        },
      ],
      label: 'Interscope Records',
      upc: '602507123456',
      artists: { connect: [{ id: artistGaga.id }] },
    },
  });

  // --- Songs ---
  const songTimeOfOurLives = await prisma.song.create({
    data: {
      id: '11dFghVXANMlKmJXsNCbNl',
      title: 'Time of Our Lives',
      images: [
        {
          url: 'https://i.ytimg.com/vi/xxxxxx/maxresdefault.jpg',
          height: 720,
          width: 1280,
        },
      ],
      release_date: new Date('2014-11-24'),
      track_number: 3,
      disc_number: 1,
      duration: 229000, // 3:49
      explicit: false,
      isrc: 'USRC11401234',
      albumId: albumGlobalization.id,
      artists: { connect: [{ id: artistPitbull.id }] },
    },
  });

  const songTimber = await prisma.song.create({
    data: {
      id: '2j6b1q3e4r5t6y7u8i9o0p1q2w',
      title: 'Timber',
      images: [
        {
          url: 'https://i.ytimg.com/vi/yyyyyy/maxresdefault.jpg',
          height: 720,
          width: 1280,
        },
      ],
      release_date: new Date('2013-10-07'),
      track_number: 5,
      disc_number: 1,
      duration: 204000, // 3:24
      explicit: false,
      isrc: 'USRC11301234',
      albumId: albumGlobalization.id,
      artists: { connect: [{ id: artistPitbull.id }, { id: artistKesha.id }] },
    },
  });

  const songDieYoung = await prisma.song.create({
    data: {
      id: '3a4b5c6d7e8f9g0h1i2j3k4l5m',
      title: 'Die Young',
      images: [
        {
          url: 'https://i.ytimg.com/vi/zzzzzz/maxresdefault.jpg',
          height: 720,
          width: 1280,
        },
      ],
      release_date: new Date('2012-09-25'),
      track_number: 2,
      disc_number: 1,
      duration: 211000, // 3:31
      explicit: false,
      isrc: 'USRC11201234',
      albumId: albumWarrior.id,
      artists: { connect: [{ id: artistKesha.id }] },
    },
  });

  const songRainOnMe = await prisma.song.create({
    data: {
      id: '6n1q2w3e4r5t6y7u8i9o0p1q2w',
      title: 'Rain On Me',
      images: [
        {
          url: 'https://i.ytimg.com/vi/aaaaaa/maxresdefault.jpg',
          height: 720,
          width: 1280,
        },
      ],
      release_date: new Date('2020-05-22'),
      track_number: 2,
      disc_number: 1,
      duration: 182000, // 3:02
      explicit: false,
      isrc: 'USUM72012345',
      albumId: albumChromatica.id,
      artists: { connect: [{ id: artistGaga.id }] },
    },
  });

  // --- Uploaders (YouTube channels) ---
  const uploaderCutLove = await prisma.uploader.create({
    data: {
      id: 'UC1Isl5kPQCsiBvqUdMhM0qw',
      name: 'CUTLoveRx',
      images: [
        {
          url: 'https://yt3.googleusercontent.com/xxxxxx',
          height: 176,
          width: 176,
        },
      ],
      created_at: new Date('2015-03-12'),
    },
  });

  const uploaderNightcoreReality = await prisma.uploader.create({
    data: {
      id: 'UC2Jd0NmPuamShAr6KMmsHY',
      name: 'NightcoreReality',
      images: [
        {
          url: 'https://yt3.googleusercontent.com/yyyyyy',
          height: 176,
          width: 176,
        },
      ],
      created_at: new Date('2016-07-21'),
    },
  });

  // --- Nightcores ---
  const nightcoreTimber = await prisma.nightcore.create({
    data: {
      id: 'cvaIgq5j2Q8',
      urls: ['https://invidious.example.com/watch?v=cvaIgq5j2Q8'],
      title: 'Timber (Nightcore)',
      images: [
        {
          url: 'https://i.ytimg.com/vi/cvaIgq5j2Q8/maxresdefault.jpg',
          height: 720,
          width: 1280,
        },
      ],
      release_date: new Date('2021-01-15'),
      duration: 204000,
      uploaderId: uploaderCutLove.id,
      songId: songTimber.id,
      albumId: albumGlobalization.id, // denormalized
      artists: { connect: [{ id: artistPitbull.id }, { id: artistKesha.id }] },
    },
  });

  const nightcoreDieYoung = await prisma.nightcore.create({
    data: {
      id: 'dEfGhIjKlMn',
      urls: ['https://invidious.example.com/watch?v=dEfGhIjKlMn'],
      title: 'Die Young (Nightcore)',
      images: [
        {
          url: 'https://i.ytimg.com/vi/dEfGhIjKlMn/maxresdefault.jpg',
          height: 720,
          width: 1280,
        },
      ],
      release_date: new Date('2021-02-20'),
      duration: 211000,
      uploaderId: uploaderNightcoreReality.id,
      songId: songDieYoung.id,
      albumId: albumWarrior.id,
      artists: { connect: [{ id: artistKesha.id }] },
    },
  });

  const nightcoreRainOnMe = await prisma.nightcore.create({
    data: {
      id: 'qWeRtYuIoP',
      urls: ['https://invidious.example.com/watch?v=qWeRtYuIoP'],
      title: 'Rain On Me (Nightcore)',
      images: [
        {
          url: 'https://i.ytimg.com/vi/qWeRtYuIoP/maxresdefault.jpg',
          height: 720,
          width: 1280,
        },
      ],
      release_date: new Date('2021-03-10'),
      duration: 182000,
      uploaderId: uploaderCutLove.id,
      songId: songRainOnMe.id,
      albumId: albumChromatica.id,
      artists: { connect: [{ id: artistGaga.id }] },
    },
  });

  // --- Users ---
  const userAlice = await prisma.user.create({
    data: {
      username: 'alice_nightcore',
      name: 'Alice Wonder',
      profile_picture: 'https://example.com/alice.jpg',
      profile_banner: 'https://example.com/alice_banner.jpg',
      bio: 'Nightcore enthusiast',
      links: ['https://twitter.com/alice', 'https://instagram.com/alice'],
    },
  });

  const userBob = await prisma.user.create({
    data: {
      username: 'bob_musicfan',
      name: 'Bob Builder',
      profile_picture: 'https://example.com/bob.jpg',
      profile_banner: 'https://example.com/bob_banner.jpg',
      bio: 'I love sped-up music',
      links: ['https://soundcloud.com/bob'],
    },
  });

  // --- Follows ---
  await prisma.follow.create({
    data: {
      followerId: userAlice.id,
      followingId: userBob.id,
    },
  });

  // --- Playlists ---
  const playlistChill = await prisma.playlist.create({
    data: {
      name: 'Chill Nightcores',
      description: 'Relaxing nightcore mixes',
      ownerId: userAlice.id,
      nightcores: {
        create: [
          { nightcoreId: nightcoreTimber.id },
          { nightcoreId: nightcoreRainOnMe.id },
        ],
      },
    },
  });

  const playlistWorkout = await prisma.playlist.create({
    data: {
      name: 'Workout Energy',
      description: 'High BPM nightcore for gym',
      ownerId: userBob.id,
      nightcores: {
        create: [{ nightcoreId: nightcoreDieYoung.id }],
      },
    },
  });

  // --- Favorites (polymorphic) ---
  await prisma.favorite.createMany({
    data: [
      { userId: userAlice.id, songId: songTimber.id },
      { userId: userAlice.id, nightcoreId: nightcoreRainOnMe.id },
      { userId: userAlice.id, artistId: artistKesha.id },
      { userId: userBob.id, albumId: albumChromatica.id },
      { userId: userBob.id, playlistId: playlistChill.id },
      { userId: userBob.id, uploaderId: uploaderCutLove.id },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
