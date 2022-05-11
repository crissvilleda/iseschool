import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ActivityIcon from "../../assets/img/activities.png";
import useDelete from "../../hooks/useDelete";
import LoadingContext from "../../context/LoadingContext";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import InputAnswer from "../../components/InputAnswer";

async function getActivities(activities = []) {
  let querySet = query(
    collection(db, "activities"),
    // startAfter(activities),
    limit(25),
    orderBy("createdAt")
  );

  const querySnapshot = await getDocs(querySet);
  const result = [];
  querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  return result;
}

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const { deleteData } = useDelete("users");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getActivities(activities)
      .then((data) => {
        if (data) setActivities(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const removeData = async (id) => {
    setLoading(true);
    await deleteData(id);
    await getActivities(activities).then((data) => {
      if (data) setActivities(data);
    });
    setLoading(false);
  };

  const activities2 = [
    {
      id: 1,
      title:
        "n 1ion lorem loaasdj lkasjdf kj asdlfion lorem loaasdj lkasjdf kj asdlf",
      description:
        "description lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kcription lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf 1",
      expirationDate: "10 de mayo de 2020",
    },
    {
      id: 2,
      title: "n 2",
      description:
        "description lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf 2",
      expirationDate: "10 de enero de 2020",
    },
    {
      id: 3,
      title: "n 3",
      description:
        "description lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf 3",
      expirationDate: "10 de marzo de 2020",
    },
    {
      id: 4,
      title: "n 4",
      description:
        "description loremsdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf lorem asdf qwef gbadgwgsdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf lorem asdf qwef gbadgwg loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf 4",
      expirationDate: "10 de ella de 2020",
    },
    {
      id: 5,
      title: "n 5",
      description:
        "description lorem loaasdj lkasjdf kj asdlfj l;ajsdfl kjasld;kfj alk;sdjfk;alsj dlfkjasdl;kfj l;askdjf;lk asjdfqiwfopwoefjnwefnwf lorem asdf qwef gbadgwgadsg 5",
      expirationDate: "10 de diciembre de 2020",
    },
  ];

  return (
    <>
      <div className="is-flex is-justify-content-space-between my-4">
        <div className="is-flex">
          <img src={ActivityIcon} className="title-icon" />
          <h1 className="title is-3 ml-2">Mis Actividades</h1>
        </div>
      </div>

      <div className="row">
        {activities2.map(({ title, description, expirationDate, id }) => (
          <div className="p-0 m-0 col-12 col-sm-6" key={id}>
            <div
              className=" p-3 m-3 d-flex flex-column cursor-pointer bg-light shadow"
              style={{
                borderLeft: "15px solid red",
                borderRadius: "15px",
                height: "220px",
              }}
              onClick={() => {
                navigate(`/activity-student/${id}/description`);
              }}
            >
              <h6 className="fw-bold text-line-1">{title}</h6>
              <p className=" text-line-5">{description}</p>
              <span className="ml-auto mt-auto p-0">{expirationDate}</span>
              <span className="mt-auto mr-auto badge bg-danger d-inline">
                Sin completar
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
