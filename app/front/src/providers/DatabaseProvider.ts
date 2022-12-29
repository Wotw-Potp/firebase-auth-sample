import { dbRootRef } from '../config/Firebase'
import {
  child,
  DatabaseReference,
  limitToFirst,
  off,
  onValue,
  push,
  Query,
  query,
  update,
} from 'firebase/database'
import { useEffect, useState } from 'react'
import { Memo, MemoList } from '../@types/memo'

function getUserMemosRef(uid: string) {
  const userMemoRef = child(dbRootRef, `/users/${uid}/memos`)
  return query(userMemoRef, limitToFirst(100))
}

function getUserMemo(ref: DatabaseReference | Query) {
  const [data, setData] = useState<MemoList>({})

  useEffect(() => {
    return onValue(ref, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val())
      }
      off(ref)
    })
  }, [ref])

  return { data }
}

async function insertUserMemo(uid: string, memo: Memo) {
  return await push(child(dbRootRef, `/users/${uid}/memos`), memo)
}

function getUserRef(uid: string) {
  return child(dbRootRef, `/users/${uid}`)
}

async function upsertUserProfile(uid: string, profile: string) {
  const ref = getUserRef(uid)
  return await update(ref, { '/profile': profile })
}

function getUserProfileGetterRef(uid: string) {
  return child(getUserRef(uid), 'profile')
}

function getUserProfile(ref: DatabaseReference | Query) {
  const [profile, setProfile] = useState<string | undefined>('')

  useEffect(() => {
    onValue(ref, (snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.val())
      }
      return off(ref)
    })
  }, [ref])

  return { profile }
}

export {
  getUserMemosRef,
  getUserMemo,
  insertUserMemo,
  getUserRef,
  upsertUserProfile,
  getUserProfileGetterRef,
  getUserProfile,
}
