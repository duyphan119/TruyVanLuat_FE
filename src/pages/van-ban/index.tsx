import vanbanApi from "@/api/vanban.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Pagination from "@/components/common/Pagination";
import MainLayout from "@/components/layouts/MainLayout";
import { createQueryString } from "@/utils/helpers";
import PaginationResponse from "@/types/response/PaginationResponse";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";
import {
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import textApi from "@/api/text.api";
import { FaSearch } from "react-icons/fa";
import signers from "@/dummyData/signers.json";
import textKinds from "@/dummyData/textKinds.json";
import issuingOrganizations from "@/dummyData/issuingOrganizations.json";
import statuses from "@/dummyData/statuses.json";
import Button from "@/components/common/Button";
import { GetServerSidePropsContext } from "next";

type Props = {
  data: PaginationResponse<VanBanCrawled>;
  // p: number;
};

const Page = ({ data }: Props) => {
  const router = useRouter();

  const { p } = router.query;
  const page = p ? +p : 1;

  const { register, handleSubmit } = useForm<FieldValues>();

  const { rows, count, total_pages } = data;

  console.log(data);

  const handlePageChange = (page: number) => {
    const qs = createQueryString({ ...router.query, p: page });
    router.push(`${PUBLIC_ROUTES.VANBAN}${qs}`);
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    const qs = createQueryString({ ...values, p: page });
    router.push(`${PUBLIC_ROUTES.VANBAN}${qs}`);
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   if (router.query) {
  //     console.log(router.query);
  //     vanbanApi
  //       .search(router.query)
  //       .then((res) => {
  //         isMounted && setData(res);
  //       })
  //       .catch((error) => {
  //         isMounted = false;
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });

  //     return () => {
  //       isMounted = false;
  //     };
  //   }
  // }, [router.query]);

  // useEffect(() => {
  //   Promise.all([
  //     textApi.getAreas(),
  //     textApi.getIssuingOrganizations(),
  //     textApi.getKinds(),
  //     textApi.getSigners(),
  //     textApi.getStatuses(),
  //     textApi.search(),
  //   ])
  //     .then(([res1, res2, res3, res4, res5, res6]) => {
  //       setAreas(res1);
  //       setIssuingOrganizations(res2);
  //       setKinds(res3);
  //       setSigners(res4);
  //       setStatuses(res5);
  //     })
  //     .catch((error) => {})
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>Tất cả văn bản</title>
      </Head>
      <AuthNotFound>
        <MainLayout>
          <Container className="py-4">
            <Flex className="flex-col !gap-4 !items-start">
              <Breadcrumbs
                items={[
                  {
                    href: PUBLIC_ROUTES.HOME,
                    label: "Trang chủ",
                    hideSeparateAfter: true,
                  },
                ]}
                current="Tất cả văn bản"
                titleCenter={true}
              />
              <div className="border border-neutral-500 p-4 w-full text-sm">
                <h1 className="text-2xl flex items-center justify-center mb-3 uppercase">
                  Bộ lọc tìm kiếm
                </h1>
                <form
                  className="w-full grid grid-cols-12 gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex gap-2 items-center col-span-6">
                    <label htmlFor="kwd" className="">
                      Từ khoá
                    </label>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        id="kwd"
                        className="border border-neutral-500 pr-2 py-2 pl-8 focus:border-transparent outline-neutral-500 rounded-sm w-full"
                        placeholder="Nhập từ khoá tìm kiếm"
                        {...register("kwd")}
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 left-2">
                        <FaSearch />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <label htmlFor="org" className="whitespace-nowrap">
                      Cơ quan ban hành
                    </label>
                    <select
                      id="org"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("org")}
                    >
                      <option value="0">Cơ quan ban hành</option>
                      <option value="1">Cơ quan TW</option>
                      <option value="2">Cơ quan cấp Tỉnh</option>
                      <option value="3">Bảo hiểm xã hội Việt Nam</option>
                      <option value="4">Bộ Công An</option>
                      <option value="5">Bộ Công thương</option>
                      <option value="6">Bộ Giáo dục và Đào tạo</option>
                      <option value="7">Bộ Giao thông vận tải</option>
                      <option value="8">Bộ Kế hoạch và Đầu tư</option>
                      <option value="9">Bộ Khoa học và Công nghệ</option>
                      <option value="10">
                        Bộ Lao động - Thương binh và Xã hội
                      </option>
                      <option value="11">Bộ Ngoại giao</option>
                      <option value="12">Bộ Nội vụ</option>
                      <option value="13">
                        Bộ Nông nghiệp và Phát triển nông thôn
                      </option>
                      <option value="14">Bộ Quốc phòng</option>
                      <option value="15">Bộ Tài chính</option>
                      <option value="16">Bộ Tài nguyên và Môi trường</option>
                      <option value="17">Bộ Thông tin và Truyền thông</option>
                      <option value="18">Bộ Tư pháp</option>
                      <option value="19">
                        Bộ Văn hoá, Thể thao và du lịch
                      </option>
                      <option value="20">Bộ Xây dựng</option>
                      <option value="21">Bộ Y tế</option>
                      <option value="22">Chính phủ</option>
                      <option value="23">Chủ tịch nước</option>
                      <option value="24">Kiểm toán Nhà nước</option>
                      <option value="25">Ngân hàng Nhà nước</option>
                      <option value="26">Quốc hội</option>
                      <option value="32">Thanh tra Chính phủ</option>
                      <option value="33">Thủ tướng Chính phủ</option>
                      <option value="92">Tòa án nhân dân tối cao</option>
                      <option value="93">Tổng cục Hải quan</option>
                      <option value="94">Tổng cục Thuế</option>
                      <option value="95">
                        Tổng liên đoàn Lao động Việt Nam
                      </option>
                      <option value="96">Ủy ban Dân tộc</option>
                      <option value="97">Ủy ban Thường vụ Quốc hội</option>
                      <option value="98">Văn phòng Chính phủ</option>
                      <option value="99">Viện kiểm sát nhân dân tối cao</option>
                      <option value="27">Thành phố Cần Thơ</option>
                      <option value="28">Thành phố Đà Nẵng</option>
                      <option value="29">Thành phố Hà Nội</option>
                      <option value="30">Thành phố Hải Phòng</option>
                      <option value="31">Thành phố Hồ Chí Minh</option>
                      <option value="34">Tỉnh An Giang</option>
                      <option value="35">Tỉnh Bà Rịa - Vũng Tàu</option>
                      <option value="36">Tỉnh Bắc Giang</option>
                      <option value="37">Tỉnh Bắc Kạn</option>
                      <option value="38">Tỉnh Bạc Liêu</option>
                      <option value="39">Tỉnh Bắc Ninh</option>
                      <option value="40">Tỉnh Bến Tre</option>
                      <option value="41">Tỉnh Bình Định</option>
                      <option value="42">Tỉnh Bình Dương</option>
                      <option value="43">Tỉnh Bình Phước</option>
                      <option value="44">Tỉnh Bình Thuận</option>
                      <option value="45">Tỉnh Cà Mau</option>
                      <option value="46">Tỉnh Cao Bằng</option>
                      <option value="47">Tỉnh Đắk Lắk</option>
                      <option value="48">Tỉnh Đắk Nông</option>
                      <option value="49">Tỉnh Điện Biên</option>
                      <option value="50">Tỉnh Đồng Nai</option>
                      <option value="51">Tỉnh Đồng Tháp</option>
                      <option value="52">Tỉnh Gia Lai</option>
                      <option value="53">Tỉnh Hà Giang</option>
                      <option value="54">Tỉnh Hà Nam</option>
                      <option value="55">Tỉnh Hà Tĩnh</option>
                      <option value="56">Tỉnh Hải Dương</option>
                      <option value="57">Tỉnh Hậu Giang</option>
                      <option value="58">Tỉnh Hòa Bình</option>
                      <option value="59">Tỉnh Hưng Yên</option>
                      <option value="60">Tỉnh Khánh Hòa</option>
                      <option value="61">Tỉnh Kiên Giang</option>
                      <option value="62">Tỉnh Kon Tum</option>
                      <option value="63">Tỉnh Lai Châu</option>
                      <option value="64">Tỉnh Lâm Đồng</option>
                      <option value="65">Tỉnh Lạng Sơn</option>
                      <option value="66">Tỉnh Lào Cai</option>
                      <option value="67">Tỉnh Long An</option>
                      <option value="68">Tỉnh Nam Định</option>
                      <option value="69">Tỉnh Nghệ An</option>
                      <option value="70">Tỉnh Ninh Bình</option>
                      <option value="71">Tỉnh Ninh Thuận</option>
                      <option value="72">Tỉnh Phú Thọ</option>
                      <option value="73">Tỉnh Phú Yên</option>
                      <option value="74">Tỉnh Quảng Bình</option>
                      <option value="75">Tỉnh Quảng Nam</option>
                      <option value="76">Tỉnh Quảng Ngãi</option>
                      <option value="77">Tỉnh Quảng Ninh</option>
                      <option value="78">Tỉnh Quảng Trị</option>
                      <option value="79">Tỉnh Sóc Trăng</option>
                      <option value="80">Tỉnh Sơn La</option>
                      <option value="81">Tỉnh Tây Ninh</option>
                      <option value="82">Tỉnh Thái Bình</option>
                      <option value="83">Tỉnh Thái Nguyên</option>
                      <option value="84">Tỉnh Thanh Hóa</option>
                      <option value="85">Tỉnh Thừa Thiên Huế</option>
                      <option value="86">Tỉnh Tiền Giang</option>
                      <option value="87">Tỉnh Trà Vinh</option>
                      <option value="88">Tỉnh Tuyên Quang</option>
                      <option value="89">Tỉnh Vĩnh Long</option>
                      <option value="90">Tỉnh Vĩnh Phúc</option>
                      <option value="91">Tỉnh Yên Bái</option>
                      <option value="100">Các cơ quan khác</option>
                    </select>
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <label htmlFor="type" className="whitespace-nowrap">
                      Loại văn bản
                    </label>
                    <select
                      id="type"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("type")}
                    >
                      <option value="0"> Loại văn bản</option>
                      <option value="46">Báo cáo</option>
                      <option value="1">Chỉ thị</option>
                      <option value="26">Công điện</option>
                      <option value="31">Điều ước quốc tế</option>
                      <option value="6">Hiến pháp</option>
                      <option value="9">Hướng dẫn</option>
                      <option value="45">Kế hoạch</option>
                      <option value="34">Lệnh</option>
                      <option value="10">Luật</option>
                      <option value="11">Nghị định</option>
                      <option value="13">Nghị quyết</option>
                      <option value="14">Pháp lệnh</option>
                      <option value="17">Quyết định</option>
                      <option value="18">Sắc lệnh</option>
                      <option value="21">Thông báo</option>
                      <option value="23">Thông tư</option>
                      <option value="24">Thông tư liên tịch</option>
                      <option value="40">Văn bản hợp nhất</option>
                      <option value="33">Văn bản khác</option>
                      <option value="32">Văn bản WTO</option>
                    </select>
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <label htmlFor="signer" className="whitespace-nowrap">
                      Người ký
                    </label>
                    <select
                      id="signer"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("signer")}
                    >
                      <option value="0"> Người ký</option>
                      <option value="1450"> Nguyễn Phú Trọng</option>
                      <option value="436"> Nguyễn Tấn Dũng</option>
                      <option value="1144"> Nguyễn Xuân Phúc</option>
                      <option value="1849"> Nguyễn Xuân Phúc</option>
                      <option value="5904"> Phạm Minh Chính</option>
                      <option value="2386">A.Ph.Xpi-li-ép-xki</option>
                      <option value="4210">Abdellatif Mazouz</option>
                      <option value="2372">Abdelwaheb ABDALLAH</option>
                      <option value="3554">Abdul Ariz Mohamed aL.Noaimi</option>
                      <option value="3620">Abdul Rahman Taib</option>
                      <option value="6711">
                        Abdulhadi bin Ahmed Al-Manaouri
                      </option>
                      <option value="3564">Abdullah Bin Zayed Al Nahyan</option>
                      <option value="6177">Abdullah Erdem CANTIMUR</option>
                      <option value="2443">Abdurrahman Wahid</option>
                      <option value="3797">Agvaandorjiin Tsolmon</option>
                      <option value="4589">Ahmed Macki</option>
                      <option value="6383">Akuei Bona Malwal</option>
                      <option value="6537">Alan Peter S. Cayetano</option>
                      <option value="5101">Alan Shatter</option>
                      <option value="4002">Alastair Goodlad</option>
                      <option value="3165">Alát-xtơ Cóc-xơ</option>
                      <option value="4514">A-lây-nhíc Xéc-gây</option>
                      <option value="6115">Alberto G. Romulo</option>
                      <option value="3761">Alberto Ricardo Mondlane</option>
                      <option value="1">Alexander Downer</option>
                      <option value="4745">Alfredo Moreno Charme</option>
                      <option value="5936">Al-Giê-Li-Nô Al-Pha-Nô</option>
                      <option value="1946">Alhusine Deen</option>
                      <option value="3458">Ali I. Al-Naimi</option>
                      <option value="4597">Ali Rodriguez Araque</option>
                      <option value="3624">Amaret Sila_on</option>
                      <option value="6490">Amb. Zubairu Dada</option>
                      <option value="5395">Amir Syamsudin</option>
                      <option value="817">An Dũng</option>
                      <option value="1950">Ân Thủy</option>
                      <option value="4648">An Văn Khanh</option>
                      <option value="5651">An-bớt Đen Rô-gia-ri-ô</option>
                      <option value="3812">An-đơ-rây Xlép-nhốp</option>
                      <option value="3509">Anđrây Iuriêvích Belianhinốp</option>
                      <option value="6566">Andre Vallini</option>
                      <option value="4513">Andrej Motyl</option>
                      <option value="6865">Andrew Jeffries</option>
                      <option value="5010">Ang Vong Vathana</option>
                      <option value="6535">Anifah Aman</option>
                      <option value="5062">Anil Wadhwa</option>
                      <option value="4717">Anne Grillo</option>
                      <option value="5399">Annissa Barrak</option>
                      <option value="2">Antoine Pouillieute</option>
                      <option value="4643">Antonin Kaspar</option>
                      <option value="5652">Anura Priyadarshana Yapa</option>
                      <option value="1898">Ao Văn Thinh</option>
                      <option value="3">Ap-đun Ra-him Su-bi</option>
                      <option value="5759">Apiradi Tantraporn</option>
                      <option value="5654">Ardian Xheladini</option>
                      <option value="3621">Arifin M. Siregar</option>
                      <option value="2377">Arsa Sarasin</option>
                      <option value="6475">Atchaka Sibunruang</option>
                      <option value="6330">Atul Khare</option>
                      <option value="2187">Âu Anh Tuấn</option>
                      <option value="5976">Âu Quang Duy</option>
                      <option value="2284">Aung Thaung</option>
                      <option value="7083">Avet Adonts</option>
                      <option value="6127">Aydin Aliyev</option>
                      <option value="6168">Bác-ba-ra Sư-ma-nốp-xka</option>
                      <option value="6653">Bạch Liên Hương</option>
                      <option value="5200">Bạch Ngọc Chiến</option>
                      <option value="5146">Bạch Quốc An</option>
                      <option value="1809">Bạch Quốc Khang</option>
                      <option value="4">Bạch Thị Minh Huyền</option>
                      <option value="818">Bạch Thị Phúc</option>
                      <option value="819">Bạch Văn Mừng</option>
                      <option value="3759">Bader M. Al-humaidhi</option>
                      <option value="4380">Baka András</option>
                      <option value="5560">Balog Zoltan</option>
                      <option value="5512">Bàn Đức Vinh</option>
                      <option value="820">Bành Tiến Long</option>
                      <option value="2179">Banphot Hongthong</option>
                      <option value="1598">Báo Lao động</option>
                      <option value="2331">BB Ramaiah</option>
                      <option value="2081">Bế Quốc Thịnh</option>
                      <option value="6339">Bế Thị Hồng Vân</option>
                      <option value="1817">Bế Trường Thành</option>
                      <option value="4672">Bế Xuân Đại</option>
                      <option value="4813">Bế Xuân Trường</option>
                      <option value="5773">Beatrice Maser Mallor</option>
                      <option value="3854">Be-E-Ta Xờ-Ten-Mác</option>
                      <option value="1519">Bénédict De Cerjat</option>
                      <option value="6970">Benigno S. Aquino III</option>
                      <option value="3718">Bérkesi László</option>
                      <option value="5313">Bernard K.Mambe</option>
                      <option value="1939">Bertrand De Cordoue</option>
                      <option value="3716">Bhuvesh Chaturvedi</option>
                      <option value="1935">Biaou Rogatien</option>
                      <option value="6215">Biêr Niê</option>
                      <option value="1627">Bình Tâm</option>
                      <option value="3545">Birzan Nurumbetov</option>
                      <option value="7401">Bồ Kỹ Thuật</option>
                      <option value="1603">Bộ ngành</option>
                      <option value="3358">Bồ Ngọc Thu</option>
                    </select>
                    {/* <select
                      id="nk"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("nk")}
                    >
                      <option value="">Người ký</option>
                      {signers.map((signer, index) => {
                        return (
                          <option key={index} value={signer.UID}>
                            {signer.Title}
                          </option>
                        );
                      })}
                    </select> */}
                  </div>
                  {/* <div className="col-span-4 flex items-center gap-2">
                    <label htmlFor="tt" className="whitespace-nowrap">
                      Tình trạng hiệu lực
                    </label>
                    <select
                      id="tt"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("tt")}
                    >
                      <option value="">Tình trạng hiệu lực</option>
                      {statuses.map((status, index) => {
                        return (
                          <option key={index} value={status.UID}>
                            {status.Title}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                  <div className="col-span-12 text-center">
                    <Button title="Áp dụng" newCss={true} type="submit">
                      Áp dụng
                    </Button>
                  </div>
                </form>
              </div>
              <p className="text-right w-full">
                Tìm thấy <b>{data.count}</b> văn bản phù hợp
              </p>

              <div className="grid grid-cols-12 gap-y-6 gap-x-20 w-full relative before:absolute before:content-normal before:top-0 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-neutral-400">
                {rows.map((row) => {
                  return (
                    <div
                      key={row.slug}
                      title={row.tooltip}
                      className="col-span-6 grid grid-cols-12 gap-2 group"
                    >
                      <div className="col-span-8">
                        <Link
                          href={`${PUBLIC_ROUTES.VANBAN}${row.slug}`}
                          className="group-hover:text-[var(--mainColor)] font-medium three-dot three-dot-2"
                          title={row.title}
                        >
                          {row.title}
                        </Link>
                        <p className="text-sm mt-1 inline-block text-gray-500 three-dot three-dot-3">
                          {row.description}
                        </p>
                      </div>
                      <div className="col-span-4 text-sm">
                        <p>
                          Ban hành:{" "}
                          <span className="float-right">{row.issue}</span>
                        </p>
                        {/* <p>
                          Ngày hiệu lực:{" "}
                          <span className="float-right">
                            {row.effectiveDate || "..."}
                          </span>
                        </p>
                        <p>
                          Hiệu lực:{" "}
                          <span className="float-right">{row.status}</span>
                        </p>
                        {row.expiredDate ? (
                          <p>
                            Ngày hết hiệu lực:{" "}
                            <span className="float-right">
                              {row.expiredDate}
                            </span>
                          </p>
                        ) : null} */}
                        <p>
                          Cập nhật:{" "}
                          {(() => {
                            const splitUpdated = row.updated.split("(");
                            if (splitUpdated.length > 1) {
                              return (
                                <span className="float-right">
                                  {splitUpdated[0]} <br />
                                  {"(" + splitUpdated[1]}
                                </span>
                              );
                            }
                            return (
                              <span className="float-right">{row.updated}</span>
                            );
                          })()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {count > 0 ? (
                <div className="w-full mt-6">
                  <Pagination
                    className="w-full"
                    listDotsClassName="justify-center"
                    totalPages={total_pages}
                    current={page}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : null}
            </Flex>
          </Container>
        </MainLayout>
      </AuthNotFound>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    // const data = await vanbanApi.search(context.query);
    const data = await vanbanApi.getAll(context.query);
    return { props: { data } };
  } catch (error) {}
  return { notFound: true };
};

export default Page;
