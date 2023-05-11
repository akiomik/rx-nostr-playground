import { debounceTime } from 'rxjs';
import { Relays, BackwardReq, MonoFilterAccumulater, uniq } from 'rx-nostr';
import { webcrypto } from 'crypto';
import WebSocket from 'ws';

global.WebSocket = WebSocket;
global.crypto = webcrypto;

const relays = new Relays([
  "wss://relay-jp.nostr.wirednet.jp",
  "wss://nostr-relay.nokotaro.com",
]);

const acc0 = new MonoFilterAccumulater({ kinds: [0], limit: 5 });
const req0 = BackwardReq.from(acc0, debounceTime(500));

const acc1 = new MonoFilterAccumulater({ kinds: [1], limit: 5 });
const req1 = BackwardReq.from(acc1, debounceTime(500));

relays.observeReq(req0).pipe(uniq()).subscribe((e) => console.log('req0', e.message[2].kind));
relays.observeReq(req1).pipe(uniq()).subscribe((e) => console.log('req1', e.message[2].kind));
