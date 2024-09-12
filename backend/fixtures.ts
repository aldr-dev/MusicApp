import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
    await db.dropCollection('trackhistories');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [BeyonceArt, TaylorSwift, TheWeeknd] = await Artist.create({
    name: 'Beyonce',
    image: 'fixtures/Beyonce.webp',
    information: 'Американская певица и актриса, получившая признание за свои альбомы "Lemonade" и "Beyoncé," а также за свои яркие выступления на сцене.',
  }, {
    name: 'Taylor Swift',
    image: 'fixtures/Taylor-Swift.jpeg',
    information: 'Американская певица и автор песен, знаменитая своими альбомами "1989" и "Folklore," а также успешными турне.',
  }, {
    name: 'The Weeknd',
    image: 'fixtures/The-Weeknd.jpeg',
    information: 'Канадский певец и продюсер, известный своими хитами "Blinding Lights" и "Starboy."',
  });

  const [DangerouslyInLove, Beyonce, Fearless, oneThousandNineHundredEightyNine, Starboy, BeautyBehindTheMadness] = await Album.create({
      artist: BeyonceArt,
      title: 'Dangerously in Love',
      dataRelease: '2003',
      image: 'fixtures/dangerously-in-love.jpg',
    }, {
      artist: BeyonceArt,
      title: 'Beyoncé',
      dataRelease: '2013',
      image: 'fixtures/beyonce.svg',
    }, {
      artist: TaylorSwift,
      title: 'Fearless',
      dataRelease: '2008',
      image: 'fixtures/fearless.png',
    }, {
      artist: TaylorSwift,
      title: '1989',
      dataRelease: '2014',
      image: 'fixtures/1989.jpeg',
    }, {
      artist: TheWeeknd,
      title: 'Starboy',
      dataRelease: '2016',
      image: 'fixtures/starboy.jpeg',
    }, {
      artist: TheWeeknd,
      title: 'Beauty Behind the Madness',
      dataRelease: '2015',
      image: 'fixtures/beauty-behind-the-madness.jpeg',
    }
  );

  await Track.create({
    album: DangerouslyInLove,
    title: '"Crazy in Love" (feat. Jay-Z)',
    duration: '3:56',
    trackNumber: 1,
  }, {
    album: DangerouslyInLove,
    title: '"Naughty Girl"',
    duration: '3:27',
    trackNumber: 2,
  }, {
    album: DangerouslyInLove,
    title: '"Baby Boy" (feat. Sean Paul)',
    duration: '4:05',
    trackNumber: 3,
  }, {
    album: DangerouslyInLove,
    title: '"Me, Myself and I"',
    duration: '4:04',
    trackNumber: 4,
  }, {
    album: DangerouslyInLove,
    title: 'Speechless"',
    duration: '4:20',
    trackNumber: 5,
  }, {
    album: Beyonce,
    title: '"Pretty Hurts',
    duration: '4:17',
    trackNumber: 1,
  }, {
    album: Beyonce,
    title: '"Drunk in Love" (feat. Jay-Z)',
    duration: '3:51',
    trackNumber: 2,
  }, {
    album: Beyonce,
    title: '"XO"',
    duration: '3:39',
    trackNumber: 3,
  }, {
    album: Beyonce,
    title: '"Partition"',
    duration: '3:50',
    trackNumber: 4,
  }, {
    album: Beyonce,
    title: '"Flawless" (feat. Chimamanda Ngozi Adichie)',
    duration: '4:10',
    trackNumber: 5,
  }, {
    album: Fearless,
    title: '"Fearless"',
    duration: '4:00',
    trackNumber: 1,
  }, {
    album: Fearless,
    title: '"Love Story"',
    duration: '3:55',
    trackNumber: 2,
  }, {
    album: Fearless,
    title: '"Hey Stephen"',
    duration: '4:15',
    trackNumber: 3,
  }, {
    album: Fearless,
    title: '"White Horse"',
    duration: '3:55',
    trackNumber: 4,
  }, {
    album: Fearless,
    title: '"You Belong with Me"',
    duration: '3:52',
    trackNumber: 5,
  }, {
    album: oneThousandNineHundredEightyNine,
    title: '"Blank Space"',
    duration: '3:51',
    trackNumber: 1,
  }, {
    album: oneThousandNineHundredEightyNine,
    title: '"Style"',
    duration: '3:51',
    trackNumber: 2,
  }, {
    album: oneThousandNineHundredEightyNine,
    title: '"Bad Blood"',
    duration: '3:30',
    trackNumber: 3,
  }, {
    album: oneThousandNineHundredEightyNine,
    title: '"Wildest Dreams"',
    duration: '3:40',
    trackNumber: 4,
  }, {
    album: oneThousandNineHundredEightyNine,
    title: '"Shake It Off"',
    duration: '3:39',
    trackNumber: 5,
  }, {
    album: Starboy,
    title: '"Starboy" (feat. Daft Punk)',
    duration: '3:50',
    trackNumber: 1,
  }, {
    album: Starboy,
    title: '"Party Monster"',
    duration: '3:13',
    trackNumber: 2,
  }, {
    album: Starboy,
    title: '"False Alarm"',
    duration: '3:45',
    trackNumber: 3,
  }, {
    album: Starboy,
    title: '"Reminder"',
    duration: '3:39',
    trackNumber: 4,
  }, {
    album: Starboy,
    title: '"I Feel It Coming" (feat. Daft Punk)',
    duration: '4:29',
    trackNumber: 5,
  }, {
    album: BeautyBehindTheMadness,
    title: '"Real Life"',
    duration: '4:28',
    trackNumber: 1,
  }, {
    album: BeautyBehindTheMadness,
    title: '"Losers" (feat. Labrinth)',
    duration: '3:58',
    trackNumber: 2,
  }, {
    album: BeautyBehindTheMadness,
    title: '"Can\'t Feel My Face"',
    duration: '3:35',
    trackNumber: 3,
  }, {
    album: BeautyBehindTheMadness,
    title: '"The Hills"',
    duration: '4:02',
    trackNumber: 4,
  }, {
    album: BeautyBehindTheMadness,
    title: '"Often"',
    duration: '3:52',
    trackNumber: 5,
  });

  const user = new User({
    username: 'user',
    password: '1qaz@WSX',
  });
  user.generateToken();
  await user.save();

  await db.close();
};

run().catch(console.error);