import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() =>
  import("./scenes/AdminScenes/Dashboard/Dashboard")
);
const ApproveEvents = lazy(() =>
  import("./scenes/AdminScenes/ApproveEvents/ApproveEvents")
);
const UpcomingEvents = lazy(() =>
  import("./scenes/AdminScenes/UpcomingEvents/UpcomingEvents")
);
const PastEvents = lazy(() =>
  import("./scenes/AdminScenes/PastEvents/PastEvents")
);
const AdminEventLog = lazy(() =>
  import("./scenes/AdminScenes/AdminEventLog/AdminEventLog")
);
const AllCommittees = lazy(() =>
  import("./scenes/AdminScenes/AllCommittees/AllCommittees")
);
const AddCommittees = lazy(() =>
  import("./scenes/AdminScenes/AddCommittees/AddCommittees")
);
const Convenors = lazy(() =>
  import("./scenes/AdminScenes/Convenors/Convenors")
);
const AddConvenor = lazy(() =>
  import("./scenes/AdminScenes/AddConvenor/AddConvenor")
);
const Members = lazy(() => import("./scenes/AdminScenes/Members/Members"));
const AddMember = lazy(() =>
  import("./scenes/AdminScenes/AddMember/AddMember")
);
const DashboardLayout = lazy(() => import("./scenes/Layout/DashboardLayout"));
const ChangePassword = lazy(() => import("./scenes/ChangePassword"));
const AudienceDetails = lazy(() =>
  import("./components/AudienceDetails/AudienceDetails")
);

const CommitteeDashboard = lazy(() =>
  import("./scenes/CommitteeScenes/CommitteeDashboard/CommitteeDashboard")
);
const CreateEvent = lazy(() =>
  import("./scenes/CommitteeScenes/CreateEvent/CreateEvent")
);
const UnapprovedEvents = lazy(() =>
  import("./scenes/CommitteeScenes/UnapprovedEvents/UnapprovedEvents")
);
const UpcomingCommitteeEvents = lazy(() =>
  import(
    "./scenes/CommitteeScenes/UpcomingCommitteeEvents/UpcomingCommitteeEvents"
  )
);
const CommitteePastEvents = lazy(() =>
  import("./scenes/CommitteeScenes/CommitteePastEvents/CommitteePastEvents")
);
const CommitteeEventLog = lazy(() =>
  import("./scenes/CommitteeScenes/CommitteeEventLog/CommitteeEventLog")
);
const CommitteeMembers = lazy(() =>
  import("./scenes/CommitteeScenes/CommitteeMembers/CommitteeMembers")
);
const AddCommitteeMember = lazy(() =>
  import("./scenes/CommitteeScenes/AddCommitteeMember/AddCommitteeMember")
);

export const adminRoutes = () => (
  <Route
    element={
      <Suspense>
        <DashboardLayout />
      </Suspense>
    }
  >
    <Route
      path='/Dashboard'
      element={
        <Suspense fallback={<div></div>}>
          <Dashboard />
        </Suspense>
      }
    />
    <Route
      path='/ApproveEvents'
      element={
        <Suspense fallback={<div></div>}>
          <ApproveEvents />
        </Suspense>
      }
    />
    <Route
      path='/UpcomingEvents'
      element={
        <Suspense fallback={<div></div>}>
          <UpcomingEvents />
        </Suspense>
      }
    />
    <Route
      path='/PastEvents'
      element={
        <Suspense fallback={<div></div>}>
          <PastEvents />
        </Suspense>
      }
    />
    <Route
      path='/EventLog'
      element={
        <Suspense fallback={<div></div>}>
          <AdminEventLog />
        </Suspense>
      }
    />
    <Route
      path='/ViewCommittees'
      element={
        <Suspense fallback={<div></div>}>
          <AllCommittees />
        </Suspense>
      }
    />
    <Route
      path='/AddCommittees'
      element={
        <Suspense fallback={<div></div>}>
          <AddCommittees />
        </Suspense>
      }
    />
    <Route
      path='/Convenors'
      element={
        <Suspense fallback={<div></div>}>
          <Convenors />
        </Suspense>
      }
    />
    <Route
      path='/AddConvenors'
      element={
        <Suspense fallback={<div></div>}>
          <AddConvenor />
        </Suspense>
      }
    />
    <Route
      path='/Members'
      element={
        <Suspense fallback={<div></div>}>
          <Members />
        </Suspense>
      }
    />
    <Route
      path='/AddMember'
      element={
        <Suspense fallback={<div></div>}>
          <AddMember />
        </Suspense>
      }
    />
    <Route
      path='/ChangePassword'
      element={
        <Suspense fallback={<div></div>}>
          <ChangePassword />
        </Suspense>
      }
    />
    <Route
      path='/Registrations/:eventId'
      element={
        <Suspense fallback={<div></div>}>
          <AudienceDetails />
        </Suspense>
      }
    />
  </Route>
);

export const committeeRoutes = (isConvenor) => (
  <Route
    element={
      <Suspense>
        <DashboardLayout />
      </Suspense>
    }
  >
    <Route
      path='/Dashboard'
      element={
        <Suspense fallback={<div></div>}>
          <CommitteeDashboard />{" "}
        </Suspense>
      }
    />
    <Route
      path='/CreateEvent'
      element={
        <Suspense fallback={<div></div>}>
          <CreateEvent />{" "}
        </Suspense>
      }
    />
    <Route
      path='/Unapproved'
      element={
        <Suspense fallback={<div></div>}>
          {" "}
          <UnapprovedEvents />
        </Suspense>
      }
    />
    <Route
      path='/UpcomingEvents'
      element={
        <Suspense fallback={<div></div>}>
          {" "}
          <UpcomingCommitteeEvents />
        </Suspense>
      }
    />
    <Route
      path='/PastEvents'
      element={
        <Suspense fallback={<div></div>}>
          <CommitteePastEvents />{" "}
        </Suspense>
      }
    />
    <Route
      path='/EventLog'
      element={
        <Suspense fallback={<div></div>}>
          <CommitteeEventLog />{" "}
        </Suspense>
      }
    />
    <Route
      path='/Members'
      element={
        <Suspense fallback={<div></div>}>
          {" "}
          <CommitteeMembers />
        </Suspense>
      }
    />
    <Route
      path='/ChangePassword'
      element={
        <Suspense fallback={<div></div>}>
          {" "}
          <ChangePassword />
        </Suspense>
      }
    />
    <Route
      path='/Registrations/:eventId'
      element={
        <Suspense fallback={<div></div>}>
          {" "}
          <AudienceDetails />
        </Suspense>
      }
    />
    {isConvenor && (
      <Route
        path='/AddMember'
        element={
          <Suspense fallback={<div></div>}>
            <AddCommitteeMember />{" "}
          </Suspense>
        }
      />
    )}
  </Route>
);
